// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Edunate {
    // Define roles
    enum UserRole {
        Student,
        Alumni,
        Institution,
        Admin
    }
    enum MilestoneStatus {
        Pending,
        Approved,
        Disputed
    }

    // Structs for data management
    struct User {
        address userAddress;
        UserRole role;
        string name;
        // bool isVerified;
    }

    struct Fundraiser {
        string id;
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
    event MilestoneValidated(
        uint fundraiserId,
        uint milestoneIndex,
        MilestoneStatus status
    );

    // Modifiers for role-based access control
    modifier onlyAdmin() {
        require(users[msg.sender].role == UserRole.Admin, "Not an admin");
        _;
    }
    modifier onlyInstitution() {
        require(
            users[msg.sender].role == UserRole.Institution,
            "Not an institution"
        );
        _;
    }

    function registerUser(
        address _userAddress,
        UserRole _role,
        string memory _name
    ) public {
        require(
            users[_userAddress].userAddress == address(0),
            "User already exists"
        );
        users[_userAddress] = User({
            userAddress: _userAddress,
            role: _role,
            name: _name
        });
        emit UserRegistered(_userAddress, _role);
    }

    // function verifyUser(address _userAddress) public {
    //     require(users[_userAddress].userAddress != address(0), "User does not exist");
    //     users[_userAddress].isVerified = true;
    // }

    function createFundraiser(
        string memory _id,
        string memory _title,
        uint _goalAmount,
        string[] memory _milestoneDescriptions,
        uint[] memory _milestoneAmounts
    ) public onlyInstitution {
        require(
            _milestoneDescriptions.length == _milestoneAmounts.length,
            "Mismatch in milestones data"
        );
        require(idToFundraiserId[_id] == 0, "Fundraiser ID already exists"); // Prevent duplicate _id

        uint fundraiserId = fundraiserCount++;
        Fundraiser storage fundraiser = fundraisers[fundraiserId];
        fundraiser.id = _id;
        fundraiser.institution = msg.sender;
        fundraiser.title = _title;
        fundraiser.goalAmount = _goalAmount;
        fundraiser.isActive = true;

        // Add to mapping
        idToFundraiserId[_id] = fundraiserId;

        // Add milestones
        for (uint i = 0; i < _milestoneDescriptions.length; i++) {
            fundraiser.milestones.push(
                Milestone({
                    description: _milestoneDescriptions[i],
                    amount: _milestoneAmounts[i],
                    status: MilestoneStatus.Pending,
                    proofHash: ""
                })
            );
        }

        emit FundraiserCreated(fundraiserId, msg.sender, _title);
    }

    // fetch Fundraiser by id
    function fetchFundraiserById(
        string memory _id
    ) public view returns (Fundraiser memory) {
        uint fundraiserId = idToFundraiserId[_id];
        require(
            keccak256(abi.encodePacked(fundraisers[0].id)) ==
                keccak256(abi.encodePacked(_id)),
            "Fundraiser ID mismatch"
        );

        return fundraisers[fundraiserId];
    }

    mapping(string => uint) private idToFundraiserId;

    // function donate(string memory _id) public payable {
    //     uint fundraiserId = idToFundraiserId[_id];
    //     require(
    //         fundraiserId > 0 ||
    //             (fundraiserCount > 0 &&
    //                 keccak256(abi.encodePacked(fundraisers[0].id)) ==
    //             keccak256(abi.encodePacked(_id))),
    //         "Fundraiser not found"
    //     );

    //     Fundraiser storage fundraiser = fundraisers[fundraiserId];
    //     require(fundraiser.isActive, "Fundraiser is not active");

    //     // Update fundraiser with donation
    //     fundraiser.raisedAmount += msg.value;

    //     emit DonationReceived(fundraiserId, msg.sender, msg.value);
    // }

    function donate(address payable addr) public payable {
        require(msg.value > 0, "Payment must be greater than zero");
        addr.transfer(msg.value);
    }

    function sendMilestonePayment(address payable addr) public payable{
        require(msg.value > 0, "Payment must be greater than zero");
        addr.transfer(msg.value);
    }

    // event PaymentReceived(address indexed sender, uint256 amount);

    // // Fallback function to receive Ether directly
    // fallback() external payable {
    //     emit PaymentReceived(msg.sender, msg.value);
    // }

    // // Receive function to handle plain Ether transfers
    // receive() external payable {
    //     emit PaymentReceived(msg.sender, msg.value);
    // }

    // // Function to check the contract balance
    // function getBalance() public view returns (uint256) {
    //     return address(this).balance;
    // }

    // function pay() external payable {
    //     require(msg.value > 0, "Payment must be greater than zero");
    // }

    // Withdraw function to transfer funds to an owner or any specific address
    // function withdraw(address payable _to, uint256 _amount) public {
    //     require(_amount <= address(this).balance, "Insufficient balance");
    //     _to.transfer(_amount);
    // }

}
