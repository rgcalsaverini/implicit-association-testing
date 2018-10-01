import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import ReactJson from 'react-json-view';

import { TabContainer, TextArea } from './styles';


class EditTest extends Component {
  state = {
    tab: 'manifest',
    changes: {},
  };

  componentWillReceiveProps() {
    this.setState({ changes: {}, tab: 'manifest' });
  }

  JsonEditor = (source, name) => (
    <TabContainer>
      <ReactJson
        src={source || {}}
        name={name}
        collapseStringsAfterLength={30}
        enableClipboard={false}
        displayDataTypes={false}
        sortKeys
        onEdit={v => this.handleEdit(name, v)}
        onAdd={v => this.handleEdit(name, v)}
        onDelete={v => this.handleEdit(name, v)}
        collapsed={2}
      />
    </TabContainer>
  );

  TextAreaEditor = (source, name) => (
    <TabContainer>
      <TextArea
        value={this.state.changes[name] || source || ''}
        onChange={v => this.handleEdit(name, v.target.value)}
      />
    </TabContainer>
  );

  handleEdit = (fileId, editInfo) => {
    const changes = { ...this.state.changes };
    if (editInfo.namespace) {
      changes[[fileId, ...editInfo.namespace, editInfo.name]] = editInfo.new_value;
    } else {
      changes[fileId] = editInfo;
    }
    this.setState({ changes });
  }

  handleSave = () => {
    this.props.saveTestConfigs(this.props.editingTest, this.state.changes);
    this.props.setTestEdit();
  }

  render() {
    const {
      editingTest,
      pendingReq,
      setTestEdit,
      testConfig,
      getTestConfigs,
    } = this.props;
    const hasChanges = Object.keys(this.state.changes).length > 0;
    let contents = <CircularProgress size={80} thickness={5} />;
    if (editingTest === null) {
      return <span />;
    }

    if (testConfig === null) {
      if (!pendingReq) {
        getTestConfigs(editingTest);
      }
    } else {
      contents = (
        <Tabs
          value={this.state.tab}
          onChange={tab => this.setState({ tab })}
        >
          <Tab label="Manifest" value="manifest">
            {this.JsonEditor(testConfig.manifest, 'manifest')}
          </Tab>
          <Tab label="Disclaimer" value="disclaimer">
            {this.TextAreaEditor(testConfig.disclaimer, 'diclaimer')}
          </Tab>
          <Tab label="Introduction" value="intro">
            {this.TextAreaEditor(testConfig.intro, 'intro')}
          </Tab>
          <Tab label="First Quest." value="q_start">
            {this.JsonEditor(testConfig.q_start, 'q_start')}
          </Tab>
          <Tab label="Last Quest." value="q_end">
            {this.JsonEditor(testConfig.q_end, 'q_end')}
          </Tab>
        </Tabs>
      );
    }

    const actions = [
      <FlatButton
        label={hasChanges ? 'Cancel' : 'Close'}
        primary
        onClick={() => setTestEdit()}
      />,
      <FlatButton
        label="Save changes"
        primary
        disabled={!hasChanges}
        onClick={this.handleSave}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal
        open={editingTest !== null}
        style={{
          width: '130vw',
          left: '-15vw',
        }}
        contentStyle={{
          witdh: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {contents}
      </Dialog>
    );
  }
}

EditTest.propTypes = {
  pendingReq: PropTypes.bool,
  editingTest: PropTypes.string,
  setTestEdit: PropTypes.func.isRequired,
  getTestConfigs: PropTypes.func.isRequired,
  saveTestConfigs: PropTypes.func.isRequired,
};

EditTest.defaultProps = {
  pendingReq: false,
  editingTest: null,
};

export default EditTest;
