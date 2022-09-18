import {
  MintMaxVoteWeightSource,
  ProgramAccount,
  Realm,
  getRealm,
  withDepositGoverningTokens,
  getGovernanceProgramVersion,
  Governance,
  getGovernanceAccounts,
  pubkeyFilter,
  Proposal,
} from "@solana/spl-governance";
import { getAssociatedTokenAddressSync, getMint } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import BN from "bn.js";
import { accountsToPubkeyMap } from "../../utils/accounts";
import { arrayToRecord } from "../../utils/helpers";
import { compareProposals } from "../../utils/proposals";
import { arePubkeysEqual } from "../../utils/pubkey";
import { getMintMeta } from "../../utils/token";
import { LibError } from "../errors";
import { IRealm } from "../interfaces/realm";
import { MintMeta } from "../types";

export class BasicRealm implements IRealm {
  public readonly id = "basic";

  private _programId: PublicKey;
  private _programVersion: number;
  private _account: ProgramAccount<Realm>;
  private _communityMintMeta: MintMeta;
  private _councilMintMeta: MintMeta | undefined;
  private _imageUrl?: string;

  private _governances: ProgramAccount<Governance>[] = [];
  private _proposals: ProgramAccount<Proposal>[] = [];

  constructor(
    programId: PublicKey,
    programVersion: number,
    account: ProgramAccount<Realm>,
    communityMintMeta: MintMeta,
    governances: ProgramAccount<Governance>[],
    proposals: ProgramAccount<Proposal>[],
    councilMintMeta?: MintMeta,
    imageUrl?: string
  ) {
    this._programId = programId;
    this._programVersion = programVersion;
    this._account = account;
    this._communityMintMeta = communityMintMeta;
    this._councilMintMeta = councilMintMeta;
    this._imageUrl = imageUrl;
    this._governances = governances;
    this._proposals = proposals;
  }

  public get programId(): PublicKey {
    return this._programId;
  }

  public get account(): ProgramAccount<Realm> {
    return this._account;
  }

  public get communityMint(): MintMeta {
    return this._communityMintMeta;
  }

  public get councilMint(): MintMeta | undefined {
    return this._councilMintMeta;
  }

  public get authority(): PublicKey | undefined {
    return this._account.account.authority;
  }

  public get votingProposalCount(): number {
    return this._account.account.votingProposalCount;
  }

  public get communityMintMaxVoteWeightSource(): MintMaxVoteWeightSource {
    return this._account.account.config.communityMintMaxVoteWeightSource;
  }

  public get minVoteWeightToCreateGovernance(): BN {
    return this._account.account.config.minCommunityTokensToCreateGovernance;
  }

  public get imageUrl(): string | undefined {
    return this._imageUrl;
  }

  public get name(): string {
    return this._account.account.name;
  }

  public get programVersion(): number {
    return this._programVersion;
  }

  public get governances(): ProgramAccount<Governance>[] {
    return this._governances;
  }

  public get proposals(): ProgramAccount<Proposal>[] {
    return this._proposals;
  }

  static async load(
    connection: Connection,
    realmId: PublicKey,
    programId: PublicKey,
    imageUrl?: string
  ): Promise<BasicRealm> {
    const realmAccount = await getRealm(connection, realmId);
    const programVersion = await getGovernanceProgramVersion(
      connection,
      programId
    );

    getMint;
    if (!arePubkeysEqual(realmAccount.owner, programId))
      throw new LibError(
        `programId: ${programId
          .toBase58()
          .slice(0, 6)}... does not own realmId: ${realmId
          .toBase58()
          .slice(0, 6)}...`
      );

    const communityMint = realmAccount.account.communityMint;
    const councilMint = realmAccount.account.config.councilMint;

    const communityMintMeta = await getMintMeta(connection, communityMint);
    const councilMintMeta = councilMint
      ? await getMintMeta(connection, councilMint)
      : undefined;

    const governances = await getGovernanceAccounts(
      connection,
      new PublicKey(programId),
      Governance,
      [pubkeyFilter(1, realmId)!]
    );

    const proposalsByGovernance = await Promise.all(
      governances.map((g) =>
        getGovernanceAccounts(connection, new PublicKey(programId), Proposal, [
          pubkeyFilter(1, g.pubkey)!,
        ])
      )
    );
    const proposals = proposalsByGovernance.flatMap((p) => p);
    proposals.sort((a, b) =>
      compareProposals(a.account, b.account, accountsToPubkeyMap(governances))
    );

    return new BasicRealm(
      programId,
      programVersion,
      realmAccount,
      communityMintMeta,
      governances,
      proposals,
      councilMintMeta,
      imageUrl
    );
  }

  public async getDepositCommunityMintTransaction(
    connection: Connection,
    amount: BN,
    owner: PublicKey
  ): Promise<Transaction> {
    const instructions: TransactionInstruction[] = [];

    const ataAddress = await getAssociatedTokenAddressSync(
      this.communityMint.address,
      owner,
      true
    );

    await withDepositGoverningTokens(
      instructions,
      this.programId,
      this.programVersion,
      this.account.pubkey,
      ataAddress,
      this.communityMint.address,
      owner,
      owner,
      owner,
      amount
    );

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const tx = new Transaction({
      feePayer: owner,
      blockhash,
      lastValidBlockHeight,
    }).add(...instructions);

    return tx;
  }
}
