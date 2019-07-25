import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router'

/* eslint-disable global-require */
export const ICONS = {
  homeNav: require('@images/icon-nav-home.svg'),
  homeNavActive: require('@images/icon-nav-home-hover.svg'),
  walletNav: require('@images/icon-nav-wallet.svg'),
  walletNavActive: require('@images/icon-nav-wallet-hover.svg'),
  avatarNav: require('@images/icon-nav-profile.svg'),
  avatarNavActive: require('@images/icon-nav-profile-hover.svg'),
  claimsNav: require('@images/icon-nav-wallet.svg'),
  claimsNavActive: require('@images/icon-nav-wallet-hover.svg'),
  settingsNav: require('@images/icon-nav-settings.svg'),
  settingsNavActive: require('@images/icon-nav-settings-hover.svg')
}
/* eslint-enable global-require */

class Navbar extends Component {
  static propTypes = {
    activeTab: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.onHomeNavMouseOver = this.onHomeNavMouseOver.bind(this)
    this.onHomeNavMouseOut = this.onHomeNavMouseOut.bind(this)
    this.onWalletNavMouseOver = this.onWalletNavMouseOver.bind(this)
    this.onWalletNavMouseOut = this.onWalletNavMouseOut.bind(this)
    this.onClaimsNavMouseOver = this.onClaimsNavMouseOver.bind(this)
    this.onClaimsNavMouseOut = this.onClaimsNavMouseOut.bind(this)
    this.onAvatarNavMouseOver = this.onAvatarNavMouseOver.bind(this)
    this.onAvatarNavMouseOut = this.onAvatarNavMouseOut.bind(this)
    this.onSettingsNavMouseOver = this.onSettingsNavMouseOver.bind(this)
    this.onSettingsNavMouseOut = this.onSettingsNavMouseOut.bind(this)

    this.state = {
      homeTabHover: false,
      walletTabHover: false,
      avatarTabHover: false,
      claimsTabHover: false,
      settingsTabHover: false
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

  onClaimsNavMouseOver() {
    this.setState({ claimsTabHover: true })
  }

  onClaimsNavMouseOut() {
    this.setState({ claimsTabHover: false })
  }

  onSettingsNavMouseOver() {
    this.setState({ settingsTabHover: true })
  }

  onSettingsNavMouseOut() {
    this.setState({ settingsTabHover: false })
  }

  settingsNavIconImage() {
    if (this.props.activeTab === 'settings' || this.state.settingsTabHover) {
      return ICONS.settingsNavActive
    } else {
      return ICONS.settingsNav
    }
  }

  homeNavIconImage() {
    if (this.props.activeTab === 'home' || this.state.homeTabHover) {
      return ICONS.homeNavActive
    } else {
      return ICONS.homeNav
    }
  }

  walletNavIconImage() {
    if (this.props.activeTab === 'wallet' || this.state.walletTabHover) {
      return ICONS.walletNavActive
    } else {
      return ICONS.walletNav
    }
  }

  claimsNavIconImage() {
    if (this.props.activeTab === 'claims' || this.state.claimsTabHover) {
      return ICONS.claimsNavActive
    } else {
      return ICONS.claimsNav
    }
  }

  avatarNavIconImage() {
    if (this.props.activeTab === 'avatar' || this.state.avatarTabHover) {
      return ICONS.avatarNavActive
    } else {
      return ICONS.avatarNav
    }
  }

  render() {
    const homeActive =
      this.props.activeTab === 'home' || this.state.homeTabHover
    const avatarActive =
      this.props.activeTab === 'avatar' || this.state.avatarTabHover
    const claimsActive =
      this.props.activeTab === 'claims' || this.state.claimsTabHover
    const walletActive =
      this.props.activeTab === 'wallet' || this.state.walletTabHover
    const settingsActive =
      this.props.activeTab === 'settings' || this.state.settingsTabHover

    return (
      <header
        className="container-fluid no-padding bg-white fixed-top"
        style={{ maxWidth: 'unset', zIndex: 9 }}
      >
        <nav className="navbar navbar-expand container-lg mx-auto">
          <ul className="navbar-nav container-fluid">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onMouseOver={this.onHomeNavMouseOver}
                onMouseOut={this.onHomeNavMouseOut}
              >
                <img src={this.homeNavIconImage()} alt="Home" />
                <span className={`${homeActive ? 'active' : ''}`}>Home</span>
              </Link>
            </li>
            <li className="nav-item ml-auto">
              <Link
                to="/profiles"
                className="nav-link"
                onMouseOver={this.onAvatarNavMouseOver}
                onMouseOut={this.onAvatarNavMouseOut}
              >
                <img src={this.avatarNavIconImage()} alt="IDs" />
                <span className={`${avatarActive ? 'active' : ''}`}>
                  &nbsp;&nbsp;&nbsp;ID
                  <span style={{ textTransform: 'lowercase' }}>s</span>
                  &nbsp;&nbsp;&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item ml-auto">
              <Link
                to="/claims"
                className="nav-link"
                onMouseOver={this.onClaimsNavMouseOver}
                onMouseOut={this.onClaimsNavMouseOut}
              >
                <img src={this.claimsNavIconImage()} alt="Claims" />
                <span className={`${claimsActive ? 'active' : ''}`}>
                  &nbsp;&nbsp;&nbsp;Claims&nbsp;&nbsp;&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/wallet/receive"
                className="nav-link"
                onMouseOver={this.onWalletNavMouseOver}
                onMouseOut={this.onWalletNavMouseOut}
              >
                <img src={this.walletNavIconImage()} alt="Wallet" />
                <span className={`${walletActive ? 'active' : ''}`}>
                  Wallet
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/account"
                className="nav-link"
                onMouseOver={this.onSettingsNavMouseOver}
                onMouseOut={this.onSettingsNavMouseOut}
              >
                <img src={this.settingsNavIconImage()} alt="Settings" />
                <span className={`${settingsActive ? 'active' : ''}`}>
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Navbar
