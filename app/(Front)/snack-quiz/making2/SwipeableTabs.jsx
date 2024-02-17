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
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

const SwipeableTabs = ({ value, setValue, imageTab, makingTab, problemTab }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(true);

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
    <Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeTabIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {imageTab}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {makingTab}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {problemTab}
        </TabPanel>
      </SwipeableViews>

      

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
          <Tab label="문제" {...allyProps(1)} />
          <Tab label="출제문제들" {...allyProps(2)} />
          
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
            <IconButton>
              <AddPhotoAlternate fontSize="large" />
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
          <TextField label="지시문" color="secondary" size="small" variant="outlined" multiline fullWidth />
          <IconButton
            color="secondary"
            variant="contained"
          >
            <Send />
          </IconButton>
        </div>
      </AppBar>
    </Box>
  );
}

export default SwipeableTabs;
