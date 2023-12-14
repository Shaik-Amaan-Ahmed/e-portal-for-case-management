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
           <a href="https://tshc.gov.in/documents/bspl_2_2023_12_13_17_43_41.pdf" target="_blank" rel="noopener noreferrer">"JUNIOR CIVIL JUDGES - Transfers and Postings of Junior Civil Judges - Orders - Issued - B.Special Section, dated 13-12-2023"</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/jspladm_2_2023_12_12_15_21_19.pdf" target="_blank" rel="noopener noreferrer">"Full Court Reference in the First Court Hall on 14-12-2023 at 3:45 pm to condole the demise of Honourable Sri Justice M.H.S.Ansari, former Judge of erstwhile High Court of A. P. and former Judge of Calcutta High Court - J.Spl.(Admn.), dt. 12-12-2023"</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/splofficer_2_2023_12_08_15_49_33.pdf" target="_blank" rel="noopener noreferrer">"TSHC-Tender Notification,dt. 08.12.2023 relating to printing and supply of calendars of the High Court for the State of Telangana and District Judiciary in the State of Telangana for the year 2024-Reg. Spl. Officer Section."</a>
         </li>
         <li>
           <a href="https://tshc.gov.in/documents/reccell_2_2023_11_29_18_42_51.pdf" target="_blank" rel="noopener noreferrer">"Notification regarding the Re-Conducting of the Skill Test to the candidates who applied to the posts of Typists and Copyists vide Notification Nos. 8/2023 and 09/2023 dated 12-05-2023 under TJMS Rules."</a>
         </li>
       </ul>
      </Box>
      
      
      </Box>
    </div>
  )
}
