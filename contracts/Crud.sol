//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Crud {
    struct Item {
        uint id;
        string name;
    }

    Item[] private items;
    uint private nextId = 1;

    // Create an item
    function createItem(string memory _name) public {
        items.push(Item(nextId, _name));
        nextId++;
    }

    // Read an item by ID
    function getItem(uint _id) public view returns (uint, string memory) {
        for (uint i = 0; i < items.length; i++) {
            if (items[i].id == _id) {
                return (items[i].id, items[i].name);
            }
        }
        revert("Item not found");
    }

    // Update an item by ID
    function updateItem(uint _id, string memory _name) public {
        for (uint i = 0; i < items.length; i++) {
            if (items[i].id == _id) {
                items[i].name = _name;
                return;
            }
        }
        revert("Item not found");
    }

    // Delete an item by ID
    function deleteItem(uint _id) public {
        for (uint i = 0; i < items.length; i++) {
            if (items[i].id == _id) {
                items[i] = items[items.length - 1];
                items.pop();
                return;
            }
        }
        revert("Item not found");
    }

    // Get total number of items
    function getItemCount() public view returns (uint) {
        return items.length;
    }
}