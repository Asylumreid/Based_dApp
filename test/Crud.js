const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Crud Contract", function () {
    async function deployCrudFixture() {
        const Crud = await ethers.getContractFactory("Crud");
        const [owner] = await ethers.getSigners();
        const crud = await Crud.deploy(); // Corrected line

        return { crud, owner };
    }

    it("Should create an item", async function () {
        const { crud } = await loadFixture(deployCrudFixture);
        await crud.createItem("Test Item");
        const item = await crud.getItem(1);
        expect(item[0]).to.equal(1);
        expect(item[1]).to.equal("Test Item");
    });

    it("Should update an item", async function () {
        const { crud } = await loadFixture(deployCrudFixture);
        await crud.createItem("Old Name");
        await crud.updateItem(1, "New Name");
        const item = await crud.getItem(1);
        expect(item[1]).to.equal("New Name");
    });

    it("Should delete an item", async function () {
        const { crud } = await loadFixture(deployCrudFixture);
        await crud.createItem("To Be Deleted");
        await crud.deleteItem(1);

        await expect(crud.getItem(1)).to.be.revertedWith("Item not found");
    });

    it("Should return the correct item count", async function () {
        const { crud } = await loadFixture(deployCrudFixture);
        expect(await crud.getItemCount()).to.equal(0);
        await crud.createItem("Item 1");
        await crud.createItem("Item 2");
        expect(await crud.getItemCount()).to.equal(2);
    });
});
