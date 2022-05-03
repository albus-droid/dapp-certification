pragma solidity ^0.5.0;

contract Certification {

  bytes8 public _certID;

  struct Certificate {
    int32 studentID;
    string studentName;
    string orgName;
    string courseName;
    uint256 expireDate;
    uint256 issueDate;
    string certURL;
    bytes8 certID;
  }

  event CertCreated(
    int32 studentID,
    string studentName,
    string orgName,
    string courseName,
    uint256 expireDate,
    uint256 issueDate,
    string certURL,
    bytes8 certID
  );

  mapping(bytes8 => Certificate) public certificate;
  
  function uploadCert(int32 _studentID, string memory _studentName,string memory _orgName,string memory _courseName, uint256 _expireDate,string memory _certURL) public {
    require(_studentID!=0);
    require(bytes(_studentName).length > 0);
    require(bytes(_orgName).length > 0);
    require(bytes(_courseName).length > 0);
    require(_expireDate!=0);
    _certID = bytes8(keccak256(abi.encodePacked(_studentID,now)));
    certificate[_certID]= Certificate(_studentID, _studentName, _orgName,_courseName, (_expireDate-1970)*365*24*60*60,now,_certURL,_certID);   
    emit CertCreated(_studentID, _studentName, _orgName,_courseName, _expireDate,now,_certURL,_certID);
  } 

  function certDetails(bytes8 cert_id) public view returns(int32,string memory,string memory,string memory,uint256,uint256,string memory,bytes32) {
    bytes8 byte_id = cert_id;
    Certificate memory temp = certificate[byte_id];
    require(temp.expireDate >= now, "Certificate no longer valid");
    return (temp.studentID,temp.studentName, temp.orgName, temp.courseName, temp.expireDate,temp.issueDate,temp.certURL,temp.certID);
  }

  
   
}