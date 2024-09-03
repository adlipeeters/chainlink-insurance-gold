// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Counter} from "./Counter.sol";

// contract Policy is ChainlinkClient {}
contract Policy {
    uint256 public policyId;
    address public policyHolder;
    uint256 public startDate;
    uint256 public endDate;
    int256 public threshold;
    uint256 public price;
    bool public policyActive;
    bool public payoutTriggered;

    constructor(
        uint256 _policyId,
        address _policyHolder,
        uint256 _startDate,
        uint256 _endDate,
        int256 _threshold,
        uint256 _price
    ) {
        policyId = _policyId;
        policyHolder = _policyHolder;
        startDate = _startDate;
        endDate = _endDate;
        threshold = _threshold;
        price = _price;
        policyActive = true;
        payoutTriggered = false;
    }

    function triggerPayout() public {
        require(policyActive, "Policy is not active");
        require(!payoutTriggered, "Payout has already been triggered");

        policyActive = false;
        payoutTriggered = true;
    }

    function triggerInnactive() public {
        require(policyActive, "Policy is not active");
        policyActive = false;
    }
}
