/* eslint-disable react/jsx-props-no-spreading */

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;
  const match = useRouteMatch(to);

  const renderLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to],
  );

  return (
    <li>
      <ListItem selected={!!match} button component={renderLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const NavigationSidebar = () => {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Money Flow" />
      </ListItem>
      <ListItemLink selected primary="Payments" to="/payments" icon={<NextWeekIcon />} />
      <ListItemLink primary="Recurring" to="/recurring-payments" icon={<LoopIcon />} />
    </List>
  );
};

export default NavigationSidebar;

/* eslint-enable react/jsx-props-no-spreading */
