import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Image from './../components/Image'
import { AccountActions } from '../account/store/account'
import Completion from './Completion'
import ActionItem from './ActionItem'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import roundTo from 'round-to'

function mapStateToProps(state) {
  return {
    dropboxAccessToken: state.settings.api.dropboxAccessToken,
    localIdentities: state.profiles.identity.localIdentities,
    defaultIdentity: state.profiles.identity.default,
    addressBalanceUrl: state.settings.api.zeroConfBalanceUrl,
    coreWalletAddress: state.account.coreWallet.address,
    coreWalletBalance: state.account.coreWallet.balance,
    coreAPIPassword: state.settings.api.coreAPIPassword,
    nextIdentityAddressIndex: state.account.identityAccount.addressIndex,
    loggedIntoApp: state.auth.loggedIntoApp,
    viewedRecoveryCode: state.account.viewedRecoveryCode
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AccountActions), dispatch)
}

const icons = {
  homeNav: "/images/icon-nav-home.svg",
  homeNavActive: "/images/icon-nav-home-hover.svg",
  walletNav: "/images/icon-nav-wallet.svg",
  walletNavActive: "/images/icon-nav-wallet-hover.svg",
  avatarNav: "/images/icon-nav-avatar.svg",
  avatarNavActive: "/images/icon-nav-avatar-hover.svg",
  settingsNav: "/images/icon-nav-settings.svg",
  settingsNavActive: "/images/icon-nav-settings-hover.svg"
}

class Navbar extends Component {
  static propTypes = {
    hideBackToHomeLink: PropTypes.bool,
    dropboxAccessToken: PropTypes.string,
    localIdentities: PropTypes.object.isRequired,
    refreshCoreWalletBalance: PropTypes.func.isRequired,
    coreWalletBalance: PropTypes.number,
    coreWalletAddress: PropTypes.string,
    coreAPIPassword: PropTypes.string,
    addressBalanceUrl: PropTypes.string,
    nextIdentityAddressIndex: PropTypes.number.isRequired,
    loggedIntoApp: PropTypes.bool.isRequired,
    viewedRecoveryCode: PropTypes.bool,
    activeTab: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.storageProviderConnected = this.storageProviderConnected.bind(this)
    this.profileCreated = this.profileCreated.bind(this)
    this.depositedBitcoin = this.depositedBitcoin.bind(this)
    this.signedIntoFirstApp = this.signedIntoFirstApp.bind(this)
    this.wroteDownRecoveryCode = this.wroteDownRecoveryCode.bind(this)
    this.registeredUsername = this.registeredUsername.bind(this)
    this.roundedBtcBalance = this.roundedBtcBalance.bind(this)
    this.numberOfActionItems = this.numberOfActionItems.bind(this)
    this.onHomeNavMouseOver = this.onHomeNavMouseOver.bind(this)
    this.onHomeNavMouseOut = this.onHomeNavMouseOut.bind(this)
    this.onWalletNavMouseOver = this.onWalletNavMouseOver.bind(this)
    this.onWalletNavMouseOut = this.onWalletNavMouseOut.bind(this)
    this.onAvatarNavMouseOver = this.onAvatarNavMouseOver.bind(this)
    this.onAvatarNavMouseOut = this.onAvatarNavMouseOut.bind(this)
    this.onSettingsNavMouseOver = this.onSettingsNavMouseOver.bind(this)
    this.onSettingsNavMouseOut = this.onSettingsNavMouseOut.bind(this)
    this.getProfileRoute = this.getProfileRoute.bind(this)

    this.state = {
      homeTabHover: false,
      walletTabHover: false,
      avatarTabHover: false,
      settingsTabHover: false
    }
  }

  componentDidMount() {
    this.props.refreshCoreWalletBalance(this.props.addressBalanceUrl,
            this.props.coreAPIPassword)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coreWalletAddress !== nextProps.coreWalletAddress) {
      this.props.refreshCoreWalletBalance(nextProps.addressBalanceUrl,
        this.props.coreAPIPassword)
    }
  }

  storageProviderConnected() {
    return this.props.dropboxAccessToken ? true : false
  }

  profileCreated() {
    return this.props.nextIdentityAddressIndex > 0
  }

  depositedBitcoin() {
    return this.props.coreWalletBalance > 0
  }

  signedIntoFirstApp() {
    return this.props.loggedIntoApp
  }

  wroteDownRecoveryCode() {
    return this.props.viewedRecoveryCode
  }

  registeredUsername() {
    const localIdentities = this.props.localIdentities
    const localIdentitiesKeys = Object.keys(localIdentities)
    for (let i = 0; i < localIdentitiesKeys.length; i++) {
      const key = localIdentitiesKeys[i]
      if (localIdentities[key].ownerAddress !== key) {
        return true
      }
    }
    return false
  }

  roundedBtcBalance() {
    const btcBalance = this.props.coreWalletBalance
    if (btcBalance === null) {
      return 0
    } else {
      const roundedAmount = roundTo(btcBalance, 6)
      return roundedAmount
    }
  }

  numberOfActionItems() {
    let count = 0

    if (!this.storageProviderConnected()) {
      count = count + 1
    }

    if (!this.profileCreated()) {
      count = count + 1
    }

    if (!this.depositedBitcoin()) {
      count = count + 1
    }

    if (!this.signedIntoFirstApp()) {
      count = count + 1
    }

    if (!this.wroteDownRecoveryCode()) {
      count = count + 1
    }

    if (!this.registeredUsername()) {
      count = count + 1
    }

    return count
  }

  homeNavIconImage() {
    if(this.props.activeTab === 'home'
      || this.state.homeTabHover ) { 
      return icons.homeNavActive
    }
    else {
      return icons.homeNav
    }
  }

  walletNavIconImage() {
    if(this.props.activeTab === 'wallet'
      || this.state.walletTabHover ) { 
      return icons.walletNavActive
    }
    else {
      return icons.walletNav
    }
  }

  avatarNavIconImage() {
    if(this.props.activeTab === 'avatar'
      || this.state.avatarTabHover ) { 
      return icons.avatarNavActive
    }
    else {
      return icons.avatarNav
    }
  }

  settingsNavIconImage() {
    if(this.props.activeTab === 'settings'
      || this.state.settingsTabHover ) { 
      return icons.settingsNavActive
    }
    else {
      return icons.settingsNav
    }
  }

  onHomeNavMouseOver() {
    this.setState({ homeTabHover: true })
  }

  onHomeNavMouseOut() {
    this.setState({ homeTabHover: false })
  }

  onWalletNavMouseOver() {
    this.setState({ walletTabHover: true })
  }

  onWalletNavMouseOut() {
    this.setState({ walletTabHover: false })
  }

  onAvatarNavMouseOver() {
    this.setState({ avatarTabHover: true })
  }

  onAvatarNavMouseOut() {
    this.setState({ avatarTabHover: false })
  }

  onSettingsNavMouseOver() {
    this.setState({ settingsTabHover: true })
  }

  onSettingsNavMouseOut() {
    this.setState({ settingsTabHover: false })
  }

  getProfileRoute() {
    if (this.props.localIdentities == null
      || this.props.localIdentities.length === 0
      || this.props.defaultIdentity == null) {
      return "/profiles"
    }

    const defaultIdentityName = this.props.defaultIdentity
    const identity = this.props.localIdentities[defaultIdentityName]
    const profile = identity.profile
    
    if (!profile.hasOwnProperty('givenName') 
      && !profile.hasOwnProperty('familyName') 
      && !profile.hasOwnProperty('description')
      && !profile.hasOwnProperty('account')
      && !profile.hasOwnProperty('image')) {
      return `/profiles/${identity.domainName}/edit`
    }
    else {
      return "/profiles"
    }
  }

  render() {

    const popover = (
      <Popover id="things-to-do">
        <ActionItem
          action="Connect a storage provider to regain control of your data"
          destinationUrl="/account/storage"
          destinationName="Storage"
          completed={this.storageProviderConnected()}
        />
        <ActionItem
          action="Create your first profile independent of 3rd parties"
          destinationUrl="/profiles"
          destinationName="Profiles"
          completed={this.profileCreated()}
        />
        <ActionItem
          action="Sign in to your first Blockstack app"
          destinationUrl="https://helloblockstack.com"
          destinationName="Apps"
          completed={this.signedIntoFirstApp()}
        />
        <ActionItem
          action="Write down your backup code for keychain recovery"
          destinationUrl="/account/backup"
          destinationName="Backup"
          completed={this.wroteDownRecoveryCode()}
        />
        <ActionItem
          action="Deposit Bitcoin to enable username registration"
          destinationUrl="/wallet/receive"
          destinationName="Wallet"
          completed={this.depositedBitcoin()}
        />
        <ActionItem
          action="Register a username for your profile"
          destinationUrl="/profiles"
          destinationName="Profiles"
          completed={this.registeredUsername()}
        />
      </Popover>
    )
    const numberOfActionItems = this.numberOfActionItems()

    return (
      <header className="container-fluid no-padding">
        <nav className="navbar navbar-expand container-fluid">
          <ul className="navbar-nav container-fluid">
            <li className="nav-item">
              <Link to="/" className="nav-link"
                  onMouseOver={this.onHomeNavMouseOver} 
                  onMouseOut={this.onHomeNavMouseOut} >
                <img src={this.homeNavIconImage()} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wallet/receive" className="nav-link"
                  onMouseOver={this.onWalletNavMouseOver} 
                  onMouseOut={this.onWalletNavMouseOut} >
                <img src={this.walletNavIconImage()} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={this.getProfileRoute} className="nav-link"
                  onMouseOver={this.onAvatarNavMouseOver} 
                  onMouseOut={this.onAvatarNavMouseOut} >
                <img src={this.avatarNavIconImage()} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/account" className="nav-link"
                  onMouseOver={this.onSettingsNavMouseOver} 
                  onMouseOut={this.onSettingsNavMouseOut} >
                <img src={this.settingsNavIconImage()} />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
