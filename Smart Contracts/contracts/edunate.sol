// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Edunate {
    // Define roles
    enum UserRole { Student, Alumni, Institution, Admin }
    enum MilestoneStatus { Pending, Approved, Disputed }
    
    // Structs for data management
    struct User {
        address userAddress;
        UserRole role;
        string name;
        bool isVerified;
    }

    struct Fundraiser {
        uint id;
        address institution;
        string title;
        uint goalAmount;
        uint raisedAmount;
        Milestone[] milestones;
        bool isActive;
    }

    struct Milestone {
        string description;
        uint amount;
        MilestoneStatus status;
        string proofHash; // Hash of proof document (stored in IPFS or similar)
    }

    struct Donation {
        address donor;
        uint amount;
        uint timestamp;
    }

    // Mappings for data storage
    mapping(address => User) public users;
    mapping(uint => Fundraiser) public fundraisers;
    uint public fundraiserCount;

    // Events for transparency
    event UserRegistered(address user, UserRole role);
    event FundraiserCreated(uint id, address institution, string title);
    event DonationReceived(uint fundraiserId, address donor, uint amount);
    event MilestoneValidated(uint fundraiserId, uint milestoneIndex, MilestoneStatus status);

    // Modifiers for role-based access control
    modifier onlyAdmin() {
        require(users[msg.sender].role == UserRole.Admin, "Not an admin");
        _;
    }
    modifier onlyInstitution() {
        require(users[msg.sender].role == UserRole.Institution, "Not an institution");
        _;
    }

    function registerUser(address _userAddress, UserRole _role, string memory _name) public {
        require(users[_userAddress].userAddress == address(0), "User already exists");
        users[_userAddress] = User({
            userAddress: _userAddress,
            role: _role,
            name: _name,
            isVerified: false
        });
        emit UserRegistered(_userAddress, _role);
    }

    function verifyUser(address _userAddress) public {
        require(users[_userAddress].userAddress != address(0), "User does not exist");
        users[_userAddress].isVerified = true;
    }

    function createFundraiser(string memory _title, uint _goalAmount, string[] memory _milestoneDescriptions, uint[] memory _milestoneAmounts) 
    public onlyInstitution {
    require(_milestoneDescriptions.length == _milestoneAmounts.length, "Mismatch in milestones data");
    uint fundraiserId = fundraiserCount++;
    Fundraiser storage fundraiser = fundraisers[fundraiserId];
    fundraiser.id = fundraiserId;
    fundraiser.institution = msg.sender;
    fundraiser.title = _title;
    fundraiser.goalAmount = _goalAmount;
    fundraiser.isActive = true;

    // Add milestones
    for (uint i = 0; i < _milestoneDescriptions.length; i++) {
        fundraiser.milestones.push(Milestone({
            description: _milestoneDescriptions[i],
            amount: _milestoneAmounts[i],
            status: MilestoneStatus.Pending,
            proofHash: ""
        }));
    }

    emit FundraiserCreated(fundraiserId, msg.sender, _title);
    }

    function donate(uint _fundraiserId) public payable {
    Fundraiser storage fundraiser = fundraisers[_fundraiserId];
    require(fundraiser.isActive, "Fundraiser is not active");
    require(msg.value > 0, "Donation must be greater than zero");

    // Update fundraiser state
    fundraiser.raisedAmount += msg.value;

    emit DonationReceived(_fundraiserId, msg.sender, msg.value);
    }

}

