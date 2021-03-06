import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import marked from 'marked'

import api from 'api'

const mapStateToProps = state => ({
	...state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile,
})

const mapDispatchToProps = dispatch => ({
	onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
	onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
	onSetPage: (page, payload) => dispatch({ type: 'SET_PAGE', page, payload }),
})

const workProgression = () => (
	<div className="sub header">
		<div className="ui large breadcrumb">
			<div className="section">Process Engineer</div>
			<i className="right chevron icon divider" />
			<div className="section">Finance Manager</div>
			<i className="right chevron icon divider" />
			<div className="active section">Web Developer</div>
		</div>
	</div>
)

const EditProfileSettings = ({ isUser }) =>
	isUser ? (
		<button className="ui primary basic small button">
			<Link to="/about/edit">
				<i className="edit icon" />
				Edit Profile Settings
			</Link>
		</button>
	) : null

class About extends Component {
	componentWillMount() {
		this.props.onLoad(Promise.all([api.Profile.get('chrisongg')]))
	}

	componentWillUnmount() {
		this.props.onUnload()
	}

	render() {
		const { profile, currentUser } = this.props
		const isUser = currentUser && profile.username === currentUser.username
		const markup = profile.bio ? { __html: marked(profile.bio) } : null
		const noBio = markup ? null : <div>My story is coming...</div>

		return (
			<div>
				<div className="mb3">
					<h1 className="ui header">
						<div className="mb3">
							<span>I'm Chris.</span>
							<br />
							<span>Your problem solver.</span>
						</div>
					</h1>
					<div className="ui grid">
						<div className="ui two column row">
							<div className="left floated column">{workProgression()}</div>
							<div className="right floated right aligned column">
								<EditProfileSettings isUser={isUser} />
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-column">
					<div>
						<div dangerouslySetInnerHTML={markup} />
						{noBio}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(About)
