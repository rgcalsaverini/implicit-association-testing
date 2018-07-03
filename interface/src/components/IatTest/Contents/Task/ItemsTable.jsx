import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import constants from 'app_constants';
import { TableContainer, TableRow, GroupCol, ItemCol, TableImage, TableText } from './styles';

const getGroupNames = groupItems => Object.keys(groupItems).sort();

const getGroupItems = (items, prefix) => items.map((item) => {
  console.log(item);
  if (item.type === 'text') {
    return <TableText> {item.value} </TableText>;
  }
  return (
    <TableImage
      src={`${prefix}${item.value}`}
      alt={item.value}
    />
  );
});

const ItemsTable = (props) => {
  const { open, onClose, groupItems, prefix } = props;
  return (
    <div>
      <Dialog
        modal
        actions={[
          <FlatButton
            label="Continue"
            primary
            onClick={onClose}
          />,
        ]}
        style={{
          width: '130vw',
          left: '-15vw',
        }}
        contentStyle={{
          witdh: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
        open={open}
      >
        <div>
            Next, you will use your computer keys to categorize items
            into groups as fast as you can.
            These are the groups and the items that belong to each:
          <TableContainer>
            <GroupCol>
              {getGroupNames(groupItems).map(t => <TableRow key={t}> {t} </TableRow>)}
            </GroupCol>
            <ItemCol>
              <TableRow> {getGroupItems(groupItems.Bad, prefix)} </TableRow>
              <TableRow> {getGroupItems(groupItems.Good, prefix)} </TableRow>
              <TableRow> {getGroupItems(groupItems['Harry Potter'], prefix)} </TableRow>
              <TableRow> {getGroupItems(groupItems['Star Wars'], prefix)} </TableRow>
            </ItemCol>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
};

ItemsTable.propTypes = {
};

ItemsTable.defaultProps = { };

export default ItemsTable;
