const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Market", function () {
  it("should create and execute the market contract", async () => {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log("market address", marketAddress);

    let listingFee = await market.getListingFee();
    listingFee = listingFee.toString();
    console.log("listing Fee", listingFee);

    const auctionPrice = ethers.utils.parseUnits("2", "ether");
    const supportAuctionPrice = ethers.utils.parseUnits("4", "ether");

    await market.uploadSong(
      "https://meta.com.io",
      "https://stream.ipfs.io.thebloog",
      auctionPrice,
      supportAuctionPrice,
      {
        value: listingFee
      });

    let songs = await market.getSongs();
    songs = await Promise.all(songs.map(async (_song) => {
      const song = {
        id: _song.id,
        metadata: _song.metadata,
        price: _song.price,
        supportPrice: _song.supportPrice,
        owner: _song.owner
      }
      return song;
    }));
    console.log("songs", songs);

    let song = await market.getOneSong(1);
    console.log('my song', song);

    await market.deleteSong(1);
  });
});
