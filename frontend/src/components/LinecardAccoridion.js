import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expandButton: {
      marginRight: '40%'
  }
}));

export default function LineCardAccordion(props) {
  const classes = useStyles();
  const [accordionExpanded, setAccordionExpanded] = useState(false)
  const handleExpansion = () => {
    accordionExpanded === false? setAccordionExpanded(true) : setAccordionExpanded(false)
    console.log(accordionExpanded)
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expandButton}
        >

        </AccordionSummary>
        <AccordionDetails>
        <Typography paragraph>
            {props.lineBody}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
