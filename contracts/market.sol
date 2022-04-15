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

    event songUploaded (
        uint256 indexed id,
        string metadata,
        uint256 price,
        uint256 supportPrice,
        address indexed owner
    );

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
        uint256 _supportPrice,
        address _owner
    ) public payable {
        require(_price > 0, "price may not be 0");
        require(msg.value == listingFee, "pay the required listing fee");

        songId.increment();
        uint256 newId = songId.current();

        songs[newId] = Song(
            newId,
            _metadata,
            _price,
            _supportPrice,
            payable(_owner)
        );
        console.log("song", _metadata);
        emit songUploaded(
             newId,
            _metadata,
            _price,
            _supportPrice,
            payable(_owner)
        );
    }

    function payStreaming(uint256 _songId) public payable {
        require(
            msg.value == songs[_songId].price,
            "stream with the correct price"
        );

        uint256 streamingFee = msg.value;
        uint256 tax = (streamingFee * 5) / 100;
        uint256 final_payement = streamingFee - tax;

        songs[_songId].owner.transfer(final_payement);
        marketOwner.transfer(tax);
    }

    function paySupportStreaming(uint256 _songId) public payable {
        require(
            msg.value == songs[_songId].supportPrice,
            "stream with the correct price"
        );

       uint256 streamingFee = msg.value;
       uint256 tax = (streamingFee * 10) / 100;
       uint256 final_payement = streamingFee - tax;

        songs[_songId].owner.transfer(final_payement);
        marketOwner.transfer(tax);
    }

    function getSongs() public view returns (Song[] memory) {
        uint256 totalSongs = songId.current();
        Song[] memory allSongs = new Song[](totalSongs);

        for (uint256 i = 0; i < totalSongs; i++) {
            allSongs[i] = songs[i + 1];
        }
        return allSongs;
    }

    function getSongById(uint256 _songId) public view returns (Song memory) {
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
