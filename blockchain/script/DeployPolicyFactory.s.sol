// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import {Script} from "forge-std/Script.sol";
import {PolicyFactory} from "../src/PolicyFactory.sol";

contract DeployPolicyFactory is Script {
    function run() external returns (PolicyFactory) {
        vm.startBroadcast();

        // Deploy the PolicyFactory contract
        PolicyFactory policyFactory = new PolicyFactory();

        // Create the first policy with a duration of 30 days in milliseconds
        uint256 duration1 = 2_592_000 * 1000; // 30 days in milliseconds
        policyFactory.createPolicy(
            0.001 ether, // Price of the policy
            2525 * 10 ** 8, //  threshold
            duration1, // Duration in milliseconds
            0.002 ether, // Maximum payout
            "Policy 1", // Name of the policy
            "This is the first policy", // Description of the policy
            "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png"
        );

        // // Create the second policy with a duration of 60 days in milliseconds
        // uint256 duration2 = 5_184_000 * 1000; // 60 days in milliseconds
        // policyFactory.createPolicy(
        //     0.002 ether, // Price of the policy
        //     200, //  threshold
        //     duration2, // Duration in milliseconds
        //     0.004 ether, // Maximum payout
        //     "Policy 2", // Name of the policy
        //     "This is the second policy", // Description of the policy
        //     "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png"
        // );

        // // Create the third policy with a duration of 90 days in milliseconds
        // uint256 duration3 = 7_776_000 * 1000; // 90 days in milliseconds
        // policyFactory.createPolicy(
        //     0.003 ether, // Price of the policy
        //     300, //  threshold
        //     duration3, // Duration in milliseconds
        //     0.006 ether, // Maximum payout
        //     "Policy 3", // Name of the policy
        //     "This is the third policy", // Description of the policy
        //     "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png"
        // );

        vm.stopBroadcast();

        return policyFactory;
    }
}
