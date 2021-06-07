import "module-alias/register";

import { HardhatRuntimeEnvironment as HRE } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import {
  prepareDeployment,
  getCurrentStage,
  stageAlreadyFinished,
  trackFinishedStage,
  getContractAddress,
  saveContractDeployment,
  findDependency,
  getNetworkConstant,
} from "@deployments/utils";

import { CONTRACT_NAMES, FTC_DETAILS } from "@deployments/constants/016_ftc_vesting";

const CURRENT_STAGE = getCurrentStage(__filename);

const func: DeployFunction = trackFinishedStage(CURRENT_STAGE, async function(hre: HRE) {
  const { deploy, deployer } = await prepareDeployment(hre);

  const indexTokenAddress = await getContractAddress(CONTRACT_NAMES.INDEX_TOKEN);

  const indexGov =
    getNetworkConstant() === "development" ? deployer : await findDependency("TREASURY_MULTI_SIG");

  for (let i = 0; i < FTC_DETAILS.length; i++) {
    const contributor = FTC_DETAILS[i];
    const ftcContractName = `${CONTRACT_NAMES.FTC_VESTING} - ${contributor.address}`;
    const checkFtcAddress = await getContractAddress(ftcContractName);

    if (checkFtcAddress === "") {
      const constructorArgs: any[] = [
        indexTokenAddress,
        contributor.address,
        indexGov,
        FTC_DETAILS[i].vestingAmount,
        FTC_DETAILS[i].vestingStart,
        FTC_DETAILS[i].vestingCliff,
        FTC_DETAILS[i].vestingEnd,
      ];

      const ftcVesting = await deploy(CONTRACT_NAMES.FTC_VESTING, {
        from: deployer,
        args: constructorArgs,
        log: true,
      });

      ftcVesting.receipt &&
        (await saveContractDeployment({
          name: checkFtcAddress,
          contractAddress: ftcVesting.address,
          id: ftcVesting.receipt.transactionHash,
          description: `Deployed ${CONTRACT_NAMES.FTC_VESTING}`,
          constructorArgs,
        }));
    }
  }
});

func.skip = stageAlreadyFinished(CURRENT_STAGE);

export default func;
