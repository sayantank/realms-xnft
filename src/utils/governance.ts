import {
  Governance,
  GovernanceAccountType,
  ProgramAccount,
} from "@solana/spl-governance";

export const getGovernancesByAccountTypes = (
  governancesArray: ProgramAccount<Governance>[],
  types: GovernanceAccountType[]
) => {
  const governancesFiltered = governancesArray.filter((gov) =>
    types.some((t) => gov.account?.accountType === t)
  );
  return governancesFiltered;
};
