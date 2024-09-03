// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Counter} from "./Counter.sol";
import {Policy} from "./Policy.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/v0.8/AutomationCompatible.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/v0.8/interfaces/AggregatorV2V3Interface.sol";

contract PolicyFactory is Ownable, AutomationCompatibleInterface {
    using Counter for Counter.CounterData;

    struct FactoryPolicy {
        uint256 id;
        uint256 price;
        int256 threshold;
        uint256 duration;
        uint256 maxPayout;
        bool active;
        string name;
        string description;
        string image;
    }

    struct UserPolicy {
        uint256 id;
        uint256 policyId;
        address policyAddress;
        address policyHolder;
        uint256 startDate;
        uint256 endDate;
        int256 threshold;
        uint256 price;
        bool policyActive;
        bool payoutTriggered;
    }

    AggregatorV3Interface internal priceFeed;

    // Total number of system policies
    Counter.CounterData private totalFactoryPoliciesNr;

    // Total number of policies bought
    Counter.CounterData private totalBoughtPoliciesNr;

    // Store only the policy IDs
    uint256[] public allFactoryPolicies;

    // Store only the policy IDs
    address[] public allUsersPolicies;

    // Mapping from ID to FactoryPolicy
    mapping(uint256 => FactoryPolicy) public factoryPolicies;

    // users policies
    mapping(address => UserPolicy[]) public usersPolicies;

    event SystemPolicyCreated(
        uint256 id,
        uint256 price,
        int256 threshold,
        uint256 duration,
        uint256 maxPayout,
        string name,
        string description,
        string image
    );

    event SystemPolicyUpdated(
        uint256 id,
        uint256 price,
        int256 threshold,
        uint256 duration,
        uint256 maxPayout,
        string name,
        string description,
        string image
    );

    event UserPolicyCreated(
        uint256 id,
        uint256 policyId,
        address policyAddress,
        address policyHolder,
        uint256 startDate,
        uint256 endDate,
        int256 threshold,
        uint256 price
    );

    constructor() Ownable(msg.sender) {
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    function createPolicy(
        uint256 _price,
        int256 _threshold,
        uint256 _duration,
        uint256 _maxPayout,
        string memory _name,
        string memory _description,
        string memory _image
    ) public onlyOwner {
        totalFactoryPoliciesNr.increment();
        uint256 policyId = totalFactoryPoliciesNr.current();
        FactoryPolicy memory newPolicy = FactoryPolicy(
            policyId,
            _price,
            _threshold,
            _duration,
            _maxPayout,
            false,
            _name,
            _description,
            _image
        );

        factoryPolicies[policyId] = newPolicy;
        allFactoryPolicies.push(policyId);

        emit SystemPolicyCreated(
            newPolicy.id,
            newPolicy.price,
            newPolicy.threshold,
            newPolicy.duration,
            newPolicy.maxPayout,
            newPolicy.name,
            newPolicy.description,
            newPolicy.image
        );
    }

    function editSystemPolicy(
        uint256 _id,
        uint256 _price,
        int256 _threshold,
        uint256 _duration,
        uint256 _maxPayout,
        string memory _name,
        string memory _description,
        string memory _image
    ) public onlyOwner {
        require(factoryPolicies[_id].id == _id, "Policy not found");

        FactoryPolicy storage policy = factoryPolicies[_id];
        policy.price = _price;
        policy.threshold = _threshold;
        policy.duration = _duration;
        policy.maxPayout = _maxPayout;
        policy.name = _name;
        policy.description = _description;
        policy.image = _image;

        emit SystemPolicyUpdated(
            policy.id,
            policy.price,
            policy.threshold,
            policy.duration,
            policy.maxPayout,
            policy.name,
            policy.description,
            policy.image
        );
    }

    function buyPolicy(uint256 _id) public payable {
        require(factoryPolicies[_id].id == _id, "Policy not found");
        require(factoryPolicies[_id].active, "Policy not active");
        require(msg.value == factoryPolicies[_id].price, "Invalid price");

        uint256 curentNrOfUserPolicies = usersPolicies[msg.sender].length;
        totalBoughtPoliciesNr.increment();
        uint256 startDate = block.timestamp;
        // uint256 endDate = block.timestamp + factoryPolicies[_id].duration;
        // Convert duration from milliseconds to seconds before adding it to block.timestamp
        uint256 endDate = block.timestamp +
            (factoryPolicies[_id].duration / 1000);

        Policy newPolicy = new Policy(
            factoryPolicies[_id].id,
            msg.sender,
            startDate,
            endDate,
            factoryPolicies[_id].threshold,
            factoryPolicies[_id].price
        );

        // add to usersPolicies and allUsersPolicies
        usersPolicies[msg.sender].push(
            UserPolicy(
                totalBoughtPoliciesNr.current(),
                factoryPolicies[_id].id,
                address(newPolicy),
                msg.sender,
                startDate,
                endDate,
                factoryPolicies[_id].threshold,
                factoryPolicies[_id].price,
                true,
                false
            )
        );

        if (curentNrOfUserPolicies == 0) {
            allUsersPolicies.push(msg.sender);
        }

        emit UserPolicyCreated(
            totalBoughtPoliciesNr.current(),
            factoryPolicies[_id].id,
            address(newPolicy),
            msg.sender,
            startDate,
            endDate,
            factoryPolicies[_id].threshold,
            factoryPolicies[_id].price
        );
    }

    function togglePolicy(uint256 _id) public onlyOwner {
        require(factoryPolicies[_id].id == _id, "Policy not found");

        FactoryPolicy storage policy = factoryPolicies[_id];
        policy.active = !policy.active;
    }

    function getAllFactoryPolicies()
        public
        view
        returns (FactoryPolicy[] memory)
    {
        FactoryPolicy[] memory policies = new FactoryPolicy[](
            allFactoryPolicies.length
        );
        for (uint256 i = 0; i < allFactoryPolicies.length; i++) {
            policies[i] = factoryPolicies[allFactoryPolicies[i]];
        }
        return policies;
    }

    function getAllActiveFactoryPolicies()
        public
        view
        returns (FactoryPolicy[] memory)
    {
        uint256 activePoliciesNr = 0;
        for (uint256 i = 0; i < allFactoryPolicies.length; i++) {
            if (factoryPolicies[allFactoryPolicies[i]].active) {
                activePoliciesNr++;
            }
        }

        FactoryPolicy[] memory activePolicies = new FactoryPolicy[](
            activePoliciesNr
        );
        uint256 counter = 0;
        for (uint256 i = 0; i < allFactoryPolicies.length; i++) {
            if (factoryPolicies[allFactoryPolicies[i]].active) {
                activePolicies[counter] = factoryPolicies[
                    allFactoryPolicies[i]
                ];
                counter++;
            }
        }
        return activePolicies;
    }

    function getAllUsersPolicies() public view returns (UserPolicy[] memory) {
        uint256 totalPoliciesCount = 0;

        for (uint256 i = 0; i < allUsersPolicies.length; i++) {
            totalPoliciesCount += usersPolicies[allUsersPolicies[i]].length;
        }

        UserPolicy[] memory allPolicies = new UserPolicy[](totalPoliciesCount);

        uint256 counter = 0;
        for (uint256 i = 0; i < allUsersPolicies.length; i++) {
            address user = allUsersPolicies[i];
            UserPolicy[] memory userPolicies = usersPolicies[user];

            for (uint256 j = 0; j < userPolicies.length; j++) {
                allPolicies[counter] = userPolicies[j];
                counter++;
            }
        }
        return allPolicies;
    }

    function getFactoryPolicy(
        uint256 _id
    ) public view returns (FactoryPolicy memory) {
        return factoryPolicies[_id];
    }

    function getUserPolicies(
        address _user
    ) public view returns (UserPolicy[] memory) {
        return usersPolicies[_user];
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Payment failed");
    }

    // Function that Chainlink Keeper will call to check if upkeep is needed
    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory) {
        for (uint256 i = 0; i < allUsersPolicies.length; i++) {
            UserPolicy[] memory userPolicies = usersPolicies[
                allUsersPolicies[i]
            ];

            for (uint256 j = 0; j < userPolicies.length; j++) {
                if (
                    userPolicies[j].policyActive &&
                    !userPolicies[j].payoutTriggered
                ) {
                    (, int256 price, , , ) = priceFeed.latestRoundData();
                    int256 latestPrice = price;
                    if (
                        latestPrice < userPolicies[j].threshold &&
                        userPolicies[j].policyActive &&
                        !userPolicies[j].payoutTriggered
                    ) {
                        upkeepNeeded = true;
                    }
                }
            }
        }
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        for (uint256 i = 0; i < allUsersPolicies.length; i++) {
            UserPolicy[] storage userPolicies = usersPolicies[
                allUsersPolicies[i]
            ];

            for (uint256 j = 0; j < userPolicies.length; j++) {
                if (
                    userPolicies[j].policyActive &&
                    !userPolicies[j].payoutTriggered
                ) {
                    (, int256 price, , , ) = priceFeed.latestRoundData();
                    int256 latestPrice = price;
                    if (
                        latestPrice < userPolicies[j].threshold &&
                        userPolicies[j].policyActive &&
                        !userPolicies[j].payoutTriggered
                    ) {
                        // get the max payout for the policy
                        uint256 maxPayout = factoryPolicies[
                            userPolicies[j].policyId
                        ].maxPayout;
                        payTo(userPolicies[j].policyHolder, maxPayout);
                        userPolicies[j].payoutTriggered = true;
                        userPolicies[j].policyActive = false;
                        // mark also contract policy as inactive and payout triggered
                        Policy policy = Policy(userPolicies[j].policyAddress);
                        policy.triggerPayout();
                    }
                }
            }
        }
    }
}
