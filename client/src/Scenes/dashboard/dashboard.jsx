import { ColorModeContext, useMode } from "../../themes";
import { Box, Button, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import Data from '../../Data/people.json'
const Home = () => {
  const [theme, colorMode] = useMode();
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ]

  const handleViewFile = () => {
    // Replace this with the actual file URL
    const fileUrl = 'https://example.com/file.pdf';
  
    // Open the file in a new tab
    window.open(fileUrl, '_blank');
  };

  return (
    <Box
      sx={{
        border: "0.1px solid grey",
        display: "flex",
        height: "100vh",
        m: "10px 12px 5px 12px",
        flexDirection: "column",
      }}
    >
      <Box
        className="outer-box"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",

        }}
      >
        <Box
          className="inner-box"
          sx={{
            display: "flex",
            border: "0.1px solid grey",
            height: `${0.3 * 100}vh`,
            m: "10px 4px 4px 10px",
            width: "40%",
            borderRadius: "20px",

          }}
        >
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}`,
                arcLabelMinAngle: 45,
                data,
              },

            ]}


          />
        </Box>
        <Box
          className="inner-box"
          sx={{
            display: "flex",
            border: "0.1px solid grey",
            height: `${0.3 * 100}vh`,
            m: "10px 4px 4px 10px",
            width: "40%",
            borderRadius: "20px",
            justifyItems: "center"
          }}
        >
          <BarChart
            series={[
              { data: [3, 4, 1, 6, 5], stack: "A", label: "Series A1" },
              { data: [4, 3, 1, 5, 8], stack: "A", label: "Series A2" },
              { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
              { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
              { data: [10, 6, 5, 8, 9], label: "Series C1" },
            ]}

          />
        </Box>

      </Box>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: "5px" }}>
        Current Case
      </Typography>
      <Box
        sx={{
          padding: "20px",
          width: "100%",
          border: "0.2px solid",
          borderRadius: "20px",
          height: "50%",
          flexDirection: "row",

          justifyItems: "center",
        }}
      >


        <Typography variant="h4" sx={{margin:'5px'}}>
          Cause Title: {Data[0].cause_title}
        </Typography>

        <Typography variant="h5" sx={{margin:'5px'}}>
          Prosecution: {Data[0].Prosecution}
        </Typography>

        <Typography variant="h5" sx={{margin:'5px'}}>
          Defendant: {Data[0].Defendant}
        </Typography>

        <Typography variant="h5" sx={{margin:'5px'}}>
          Case Status: {Data[0].Status}
        </Typography>


        <Typography variant="h5" sx={{margin:'5px'}}>
          Petition-File :   
          <Button variant="contained" sx={{backgroundColor:'orange'}} onClick={handleViewFile}>
            View File
          </Button>
        </Typography>

      </Box>




    </Box>
  );
};

export default Home;
