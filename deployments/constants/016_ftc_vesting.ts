import { ether } from "@utils/common";

export const CONTRACT_NAMES = {
  INDEX_TOKEN: "IndexToken",
  FTC_VESTING: "FTCVesting",
};

export const FTC_DETAILS = [
  {
    address: "0xa037Ff147C390Fc4408A48E1263F89eB86C68f4E",
    indexAmount: ether(37478), // 37,478.00 INDEX
    vestingAmount: ether(100),
    vestingStart: 1591584576,
    vestingCliff: 1591584576,
    vestingEnd: 1669276800,
  },
  {
    address: "0xaCEd59b647Ebd79Bf917e35AF592F7f23bC914FB",
    indexAmount: ether(18739), // 18,739.00 INDEX
    vestingAmount: ether(100),
    vestingStart: 1591584576,
    vestingCliff: 1653721200,
    vestingEnd: 1669276800,
  },
  {
    address: "0x5d8b04E983a2f83174530A3574E89F42E5Ee066E",
    indexAmount: ether(28108), // 28,108.00 INDEX
    vestingAmount: ether(100),
    vestingStart: 1653721200,
    vestingCliff: 1653721200,
    vestingEnd: 1669276800,
  },
  {
    address: "0xdD709cAE362972cb3B92DCeaD77127f7b8D58202",
    indexAmount: ether(28108), // 28,108.00 INDEX
    vestingAmount: ether(100),
    vestingStart: 1622185200,
    vestingCliff: 1653721200,
    vestingEnd: 1669276800,
  },
];
