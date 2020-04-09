import { Fab } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import theme from '../../theme';

const MainFab = styled(Fab)({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
});

export default MainFab;
