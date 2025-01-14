import React from 'react';
import { Box } from '@mui/material';

export default function NoticeBoard() {
  return (
    <div>
        <Box width="maxContent" paddingTop={4} marginTop={5}  marginLeft={100} marginRight={2} justifyItems="start"> 
      <Box border="2px solid" padding="10px 20px 20px 20px">
      <h2 className='font-semibold'>Updates and Notifications <span>:</span></h2>
       
       <ul>
         <li>
           <a href="https://tshc.gov.in/documents/recruit_2025_01_02T17_50_40.pdf" target="_blank" rel="noopener noreferrer">"Recruitment- Annual Recruitment Calendar -2025 "</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/bsplsec_2025_01_08T17_15_00.pdf" target="_blank" rel="noopener noreferrer">"NJA, BHOPAL - Relief Arrangements to the nominated Judicial Officers to participate in the South Zone-II Regional Conference scheduled on 18-01-2025 and 19-01-2025 at Visakhapatnam - Orders - Issued - B.Spl Section, dated 08-01-2025"</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/bsplsec_2025_01_08T13_14_10.pdf" target="_blank" rel="noopener noreferrer">"Vacancies in the cadre of District Judges (Entry Level) by promotion from the cadre of Civil Judges (Senior Division) under 65 percent quota for the year 2025 -B.Spl. dated 08-01-2025."</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/splofficer_2025_01_09T13_22_45.pdf" target="_blank" rel="noopener noreferrer">"Guidelines for Recording of Evidence of Vulnerable Witnesses "</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/bsplsec_2025_01_07T11_06_50.pdf" target="_blank" rel="noopener noreferrer">"NJA, BHOPAL - Relief Arrangements - Nomination of (02) Newly Appointed District and Sessions Judges to participate in the Academic Programme (No.P-1432) scheduled on 11-01-2025 and 12-01-2025 at NJA, Bhopal - Orders - Issued - B.Spl., dated 06-01-2025."</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/admin_2025_01_01T08_32_59.pdf" target="_blank" rel="noopener noreferrer">"District Judge (Entry Level) 2024 - Marks list of all candidates appeared for written Examination for the posts of District Judge (Entry Level) under Direct Recruitment and Recruitment by Transfer (Accelerated) held on 28-09-2024 and 29-09-2024 and marks list of candidates appeared for Viva voce to the Nine (09) posts of District Judge (Entry Level) for the year 2024 -Reg"</a>
         </li>
         
       </ul>
      </Box>
      
      
      </Box>
    </div>
  )
}