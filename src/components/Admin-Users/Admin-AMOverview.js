import React, { Component } from "react";
import { Row, Col, Card, Jumbotron, Tabs, Tab, Table } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import AdminAssetItem from "../Admin-Assets/Admin-AssetItem";
import VerifyUserModal from "./Admin-VerifyUserModal";
import ConfirmationModal from "./Admin-ConfirmModal";
import { getUser } from "../../actions/securityActions";
import { Loader } from "../stylesheet/Loader";
import { AdminUserDetails } from "../Admin-Users/Admin-UserItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheck } from "@fortawesome/free-solid-svg-icons";

class AdminAMOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
    };
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    /* console.log("user ID: " + this.state.userId); */
    const { userData } = this.props.security;
    const { userAssets } = this.props.security;

    let unverifiedUserMsg = "Pending Verification";

    var userInfo = [
      userData.userState,
      userData.num_accepted_assets,
      userData.num_pending_assets,
    ];

    for (var i = 0; i < userInfo.length; i++) {
      if (userInfo[i] === null && userInfo[0] != 2) {
        userInfo[i] = unverifiedUserMsg;
      } else if (userInfo[i] === null && userInfo[0] == 2) {
        userInfo[i] = "Detail not provided";
      }
    }

    /* if ((userInfo[4] !== 0 || userInfo[5] !== 0) && userInfo[2] === 0) {
      codeBlock_userType = (
      <small className="text-muted">User Blocked</small>
    );
    } */

    /* var totalAssets = 0;

    for(var j = 0; j < allData.length; j++){
      totalAssets = j + 1;
     }

    const assetInVerification = (sum, obj) => sum + (obj.isVerified == false ? 1 : 0);
    const count = allData.reduce(assetInVerification, 0);
    
    var assetsListed = totalAssets - count; */

    /* userInfo[2] = 2; */

    if (userInfo[1] == null || userInfo[2] == null) {
      userInfo[1] = <Loader />;
      userInfo[2] = <Loader />;
    }

    return (
      <div>
        <div>
          <Row>
            <Col>
              <Jumbotron id="admin-userStatsCard">
                <div className="admin-userStats">
                  <h2>{userInfo[1]}</h2>
                  <h6>Assets Listed</h6>
                </div>
              </Jumbotron>
            </Col>
            <Col>
              <Jumbotron id="admin-userStatsCard">
                <div className="admin-userStats">
                  <h2>{userInfo[2]}</h2>
                  <h6>Assets in Verification</h6>
                </div>
              </Jumbotron>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col>
                  <div className="invTableContainer">
                    <div>
                      <Table>
                        <thead>
                          <tr>
                            <th>Verified</th>
                            <th>Asset Id</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userAssets.map((assets) => (
                            <tr>
                              <td>
                                {assets.isVerified == 1 ? (
                                  <FontAwesomeIcon
                                    style={{ color: "rgba(0, 128, 0, 1)" }}
                                    icon={faCheck}
                                    size="1x"
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ color: "rgba(242, 147, 57, 1)" }}
                                    size="1x"
                                  />
                                )}
                              </td>
                              <td>{assets.id}</td>
                              <td>
                                <a
                                  href={`/AdminAssetDashboard/AdminAssetOverview/${assets.id}`}
                                  id="cardNav"
                                >
                                  {assets.assetTitle}
                                </a>
                              </td>
                              <td>{assets.assetType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <br />
                  </div>

                  <br />
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Card className="userStatsCard">
                <div>
                  <div className="flexCol2">
                    <AdminUserDetails security={this.props.security} />
                  </div>
                  <br />
                </div>
                <div className="d-flex justify-content-center">
                  <ConfirmationModal userId={this.state.userId} />
                  <VerifyUserModal userId={this.state.userId} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/*  <div>
          <h1 className="primary-header">Users</h1>
          <ConfirmationModal userId={this.state.userId} />
          <VerifyUserModal userId={this.state.userId} />
        </div>
        <div className="assetCardContainer">
          <div className="flexCol2">
            <AdminUserDetails security={this.props.security}/>
          </div>
          <br />
        </div>
        <Row style={{ marginTop: "50px", position: "relative" }}>
          <Col>
            <Card className="userStatsCard">
              <Card.Header>
                <h6>Asset Listed</h6>
              </Card.Header>
              <Card.Body className="admin-userStats">
                <h2>{userInfo[1]}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="userStatsCard">
              <Card.Header>
                <h6>Assets in Verification</h6>
              </Card.Header>
              <Card.Body className="admin-userStats">
                <h2>{userInfo[2]}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {userAssets.length == 0 ? ("") : (<Row style={{ marginTop: "50px" }}>
          <Col>
            <h1 className="primary-header">Listed Asset(s)</h1>
            <div className="assetCardContainer">
              <div className="flexCol2">
                <Row>
                  {userAssets.map((assetItem) => (
                    <Col key={assetItem.id} sm={12} md={6} lg={3} xl={3}>
                      <AdminAssetItem asset={assetItem} />
                    </Col>
                  ))}
                </Row>
              </div>
              <br />
            </div>
          </Col>
        </Row>)} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUser })(AdminAMOverview);
