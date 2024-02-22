import React from "react";
import {
  styled,
  Box,
  AppBar,
  Tabs,
  Tab,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Collapse,
} from "@mui/material";
import {
  AddAPhoto,
  AddPhotoAlternate,
  PictureAsPdf,
  Send,
  ExpandMoreRounded,
  ExpandLessRounded,
} from "@mui/icons-material";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';


function TabPanel(props) {
  const { children, value, index, expanded, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{
        height: `calc(100vh - ${expanded ? '292' : '217'}px)`
      }}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SwipeableTabs = ({ value, setValue, expanded, setExpanded, handleFileAdd, handleMessageSend, isPromptLoading, ImageTab, MakingTab, ProblemTab }) => {
  const theme = useTheme();
  const [localMessage, setLocalMessage] = React.useState('');

  const handleLocalMessageChange = (event) => {
    setLocalMessage(event.target.value);
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTabIndex = (index) => {
    setValue(index);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  return (
    <>
      {/* Tab Pannel Page */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeTabIndex}
      >
        <TabPanel value={value} index={0} expanded={expanded} dir={theme.direction}>
          <ImageTab />
        </TabPanel>
        <TabPanel value={value} index={1} expanded={expanded} dir={theme.direction}>
          <MakingTab />
        </TabPanel>
        <TabPanel value={value} index={2} expanded={expanded} dir={theme.direction}>
          <ProblemTab />
        </TabPanel>
      </SwipeableViews>




      {/* App Bar */}
      <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0, alignItems: "center", paddingBottom: "36px" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          centered
          sx={{ width: "100%", maxWidth: "540px", padding: "0 20px" }}
        >
          <Tab label="이미지" {...allyProps(0)} />
          <Tab label="출제" {...allyProps(1)} />
          <Tab label="문제" {...allyProps(2)} />
          
          <IconButton onClick={() => handleExpand()}>
            {expanded ?
              <ExpandMoreRounded /> :
              <ExpandLessRounded />
            }
          </IconButton>
        </Tabs>

        <Collapse in={expanded}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <IconButton disabled>
              <AddAPhoto fontSize="large" />
            </IconButton>
            <IconButton component="label" color="primary" aria-label="add">
              <AddPhotoAlternate onClick={() => setValue(0)} fontSize="large" />
              <VisuallyHiddenInput type="file" onChange={handleFileAdd} />
            </IconButton>
            <IconButton>
              <PictureAsPdf fontSize="large" />
            </IconButton>
            <FormControl
              variant="outlined"
              size="small"
              sx={{ padding: "8px" }}
            >
              <InputLabel id="option-label">옵션 선택</InputLabel>
              <Select labelId="option-label" defaultValue={10} label="문제 양식">
                <MenuItem value={10}> 객관식 </MenuItem>
                <MenuItem value={20}> 양자택일 </MenuItem>
                <MenuItem value={30}> O/X </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Collapse>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            width: "100%",
            maxWidth: "540px",
            padding: "0 20px",
          }}
        >
          <TextField label="지시문" color="secondary" size="small" variant="outlined" multiline fullWidth disabled={isPromptLoading} onChange={(event) => handleLocalMessageChange(event)} value={localMessage} />
          <IconButton
            color="secondary"
            variant="contained"
            disabled={isPromptLoading}
            onClick={() => {handleMessageSend(localMessage); setLocalMessage('');}}
          >
            <Send />
          </IconButton>
        </div>
      </AppBar>
    </>
  );
}


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default SwipeableTabs;
