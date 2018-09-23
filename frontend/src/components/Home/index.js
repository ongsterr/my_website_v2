import React, { Component } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import moment from 'moment'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const hiddenCard = i => {
	switch (true) {
		case i === 0:
			return (
				<div className="w-100 h-100 child bg-black-10">
					<div className="flex flex-column justify-between w-100 h-100">
						<div className="row f1 fw9 h4 pt4 ph3">
							<div>MY NAME IS </div>
							&nbsp;
							<div>
								<span style={{ color: 'rgba(252, 74, 26, 0.8)' }}>CHRIS </span>
								ONG.
							</div>
						</div>
						<div className="row f1 fw9 h4 pt4 ph3">
							<div>FULL-STACK</div>
							&nbsp;
							<div style={{ color: 'rgba(252, 74, 26, 0.8)' }}>DEVELOPER</div>
						</div>
					</div>
				</div>
			)
		case i === 4:
			return (
				<div className="w-100 h-100 child bg-black-10">
					<div className="flex flex-column justify-between w-100 h-100">
						<div className="row f1 fw10 h4 pt4 ph3 white">
							<div>
								{moment()
									.format('dddd')
									.toUpperCase()}
							</div>
							&nbsp;
							<div>
								<span className="ml4">{moment().format('Do MMM YYYY')}</span>
							</div>
						</div>
						<div className="row f1 fw10 h4 pt4 ph3">
							<div className="white">________</div>
							&nbsp;
							<div style={{ color: 'rgba(252, 74, 26, 0.8)' }}>CARPE DIEM</div>
						</div>
					</div>
				</div>
			)
		default:
			return null
	}
}

export default class Home extends Component {
	static defaultProps = {
		className: 'layout',
		rowHeight: 32,
		onLayoutChange: function() {},
		cols: { lg: 12, md: 9, sm: 6, xs: 3, xxs: 2 },
		block: { lg: 6, md: 4, sm: 2, xs: 2, xxs: 2 },
		pics: {
			lg: [1, 2, 3, 4, 5, 6],
			md: [1, 2, 4, 5],
			sm: [1, 4],
			xs: [1, 4],
			xxs: [1, 4],
		},
	}

	state = {
		currentBreakpoint: null,
		currentWindowSize: null,
		compactType: 'vertical',
		mounted: false,
		layouts: null,
	}

	componentWillMount() {
		this.updateWindowSize()
	}

	updateWindowSize = () => {
		switch (true) {
			case window.innerWidth > 1200:
				this.setState({
					currentWindowSize: 'lg',
					layouts: { lg: this.generateLayout('lg') },
					mounted: true,
				})
				break
			case window.innerWidth > 868:
				this.setState({
					currentWindowSize: 'md',
					layouts: { md: this.generateLayout('md') },
					mounted: true,
				})
				break
			case window.innerWidth > 480:
				this.setState({
					currentWindowSize: 'sm',
					layouts: { sm: this.generateLayout('sm') },
					mounted: true,
				})
				break
			case window.innerWidth > 0:
				this.setState({
					currentWindowSize: 'xs',
					layouts: { xs: this.generateLayout('xs') },
					mounted: true,
				})
				break
		}
	}

	generateLayout = currentWindowSize => {
		const { block, cols } = this.props
		return Array(block[currentWindowSize])
			.fill(1)
			.map((item, i) => ({
				x: (i * 3) % (cols[currentWindowSize] - 3),
				y: Math.round((i * 3) / (cols[currentWindowSize] - 3)),
				w: 3,
				h: 8,
				i: i.toString(),
			}))
	}

	generateDOM = () => {
		const { layouts, currentWindowSize } = this.state
		const { pics } = this.props
		return layouts[currentWindowSize].map((l, i) => (
			<div key={i}>
				<div
					style={{
						backgroundImage: `url(
              https://s3-ap-southeast-2.amazonaws.com/personalwebsiteforchris/Pictures/piece${
								pics[currentWindowSize][i]
							}.png
            )`,
					}}
					className="link dt hide-child br2 w-100 h-100 cover bg-center">
					{hiddenCard(i)}
				</div>
			</div>
		))
	}

	onBreakpointChange = breakpoint => {
		this.setState(
			{
				currentBreakpoint: breakpoint,
			},
			this.updateWindowSize
		)
	}

	onLayoutChange = (layout, layouts) => {
		this.props.onLayoutChange(layout, layouts)
	}

	render = () => (
		<ResponsiveReactGridLayout
			{...this.props}
			layouts={this.state.layouts}
			onBreakpointChange={this.onBreakpointChange}
			onLayoutChange={this.onLayoutChange}
			// WidthProvider option
			measureBeforeMount={true}
			useCSSTransforms={this.state.mounted}
			compactType={this.state.compactType}
			preventCollision={!this.state.compactType}>
			{this.generateDOM()}
		</ResponsiveReactGridLayout>
	)
}
