//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Market is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private songId;
    uint256 listingFee = 0.002 ether;
    address payable marketOwner;

    struct Song {
        uint256 id;
        string metadata;
        uint256 price;
        uint256 supportPrice;
        address payable owner;
    }

    mapping(uint256 => Song) public songs;

    constructor() {
        marketOwner = payable(msg.sender);
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    function modifyListingFee(uint256 newListingFee) public {
        listingFee = newListingFee;
    }

    function uploadSong(
        string memory _metadata,
        uint256 _price,
        uint256 _supportPrice
    ) public payable returns (uint) {
        require(_price > 0, "price may not be 0");
        require(msg.value == listingFee, "pay the required listing fee");

        songId.increment();
        uint256 newId = songId.current();

        songs[newId] = Song(
            newId,
            _metadata,
            _price,
            _supportPrice,
            payable(msg.sender)
        );

        marketOwner.transfer(msg.value);
    
        return newId;
    }

    function streamSong(uint256 _songId) public payable {
        require(
            msg.value == songs[_songId].price,
            "stream with the correct price"
        );
        songs[_songId].owner.transfer(msg.value);
    }

    function streamSongAsSupport(uint256 _songId) public payable {
        require(
            msg.value == songs[_songId].supportPrice,
            "stream with the correct price"
        );
        songs[_songId].owner.transfer(msg.value);
    }

    function getSongs() public view returns (Song[] memory) {
        uint256 totalSongs = songId.current();
        Song[] memory allSongs = new Song[](totalSongs);

        for (uint256 i = 0; i < totalSongs; i++) {
            allSongs[i] = songs[i + 1];
        }
        return allSongs;
    }

    function getOneSong(uint256 _songId) public view returns (Song memory) {
        Song memory foundSong = songs[_songId];
        return foundSong;
    }

    function deleteSong(uint256 _songId) public payable {
        require(
            address(msg.sender) == address(songs[_songId].owner),
            "only the owner is able to delete this song"
        );
        delete songs[_songId];
    }
}
