import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function JudgeItem() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://tshc.gov.in/judgeImageView.action?judgetype=P&cjornot=Y&judcode=1041"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reiciendis quo eveniet perferendis nam in temporibus aliquid doloremque autem, ipsum error, veniam asperiores natus modi et voluptatem. Repellat modi, rem harum optio molestiae nam aperiam beatae, dolore deserunt illo suscipit unde accusamus temporibus. Rerum iure eaque error cumque itaque, quae laboriosam nobis, velit sunt nihil illo ipsa vero, incidunt assumenda optio fuga consequatur. Odit ducimus, impedit amet, quos, eum atque incidunt fuga aut voluptate rerum doloribus ad saepe est nobis ea dicta accusamus esse maxime ex. Rerum ullam reprehenderit beatae laboriosam delectus ex error natus esse quis similique, praesentium deleniti.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}