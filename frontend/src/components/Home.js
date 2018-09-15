import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Home extends Component {
  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 9, sm: 6, xs: 3, xxs: 2 },
    block: { lg: 6, md: 4, sm: 2, xs: 2, xxs: 2 },
  };

  state = {
    currentBreakpoint: null,
    currentWindowSize: null,
    compactType: 'vertical',
    mounted: false,
    layouts: null,
  };

  componentWillMount() {
    this.updateWindowSize();
  }

  updateWindowSize = () => {
    switch (true) {
      case window.innerWidth > 996:
        this.setState({
          currentWindowSize: 'lg',
          layouts: { lg: this.generateLayout('lg') },
          mounted: true,
        });
        break;
      case window.innerWidth > 768:
        this.setState({
          currentWindowSize: 'md',
          layouts: { md: this.generateLayout('md') },
          mounted: true,
        });
        break;
      case window.innerWidth > 480:
        this.setState({
          currentWindowSize: 'sm',
          layouts: { sm: this.generateLayout('sm') },
          mounted: true,
        });
        break;
      case window.innerWidth > 0:
        this.setState({
          currentWindowSize: 'xs',
          layouts: { xs: this.generateLayout('xs') },
          mounted: true,
        });
        break;
    }
  };

  generateLayout = currentWindowSize =>
    Array(this.props.block[currentWindowSize])
      .fill(1)
      .map((item, i) => ({
        x: (i * 3) % this.props.cols[currentWindowSize],
        y: Math.round((i * 3) / 12),
        w: 3,
        h: 8,
        i: i.toString(),
      }));

  generateDOM = () => {
    const { layouts, currentWindowSize } = this.state;
    return layouts[currentWindowSize].map((l, i) => (
      <div key={i} style={{ border: '1px solid black' }}>
        <span>{i}</span>
      </div>
    ));
  };

  onBreakpointChange = breakpoint => {
    this.setState(
      {
        currentBreakpoint: breakpoint,
      },
      this.updateWindowSize
    );
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

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
  );
}
