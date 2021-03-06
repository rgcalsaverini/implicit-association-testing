import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';
import { specialText } from 'utils';
import FlatButton from 'material-ui/FlatButton';
// import constants from 'app_constants';
import { TableContainer, TableRow, GroupCol, ItemCol, TableImage, TableText } from './styles';


const getGroupNames = groupItems => Object.keys(groupItems).sort();

const getGroupItems = (items, prefix) => items.map((item) => {
  if (item.type === 'text') {
    return <TableText key={item.value}> {item.value} </TableText>;
  }
  return (
    <TableImage
      key={item.value}
      src={`${prefix}${item.value}`}
      alt={item.value}
    />
  );
});

const ItemsTable = (props) => {
  const { open, onClose, groupItems, prefix } = props;
  const groupNames = getGroupNames(groupItems);
  if (!open) {
    return <span />;
  }

  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <div>
            Next, you will {specialText('use_what')} to categorize items
            into groups as fast as you can.
            These are the groups and the items that belong to each:
          <TableContainer>
            <GroupCol>
              {groupNames.map(t => <TableRow key={t}> {t} </TableRow>)}
            </GroupCol>
            <ItemCol>
              {groupNames.map(g => (
                <TableRow key={g}>
                  {getGroupItems(groupItems[g], prefix)}
                </TableRow>
              ))}
            </ItemCol>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
};

ItemsTable.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  prefix: PropTypes.string,
  groupItems: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

ItemsTable.defaultProps = {
  open: false,
  prefix: '',
};

export default ItemsTable;
