import { ColorModeContext, useMode } from "../../themes";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const Home = () => {
  const [theme, colorMode] = useMode();
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ]

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
        width:"100%",
        
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
            justifyItems :"center"
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
            width={600}
            height={300}
          />
        </Box>
            
        </Box>
        <Box 
          sx={{
            display:"flex",
            width:"100%",
            border:"0.2px solid",
            height:"50%",
            flexDirection:"row",
            justifyItems:"center",
          }}
        >
      </Box>
    </Box>
  );
};

export default Home;
