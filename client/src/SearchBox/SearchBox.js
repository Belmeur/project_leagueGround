import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


export default function SearchBox() {
  const [search, changeSearch] = React.useState("");
  const navigate = useNavigate();
  function handleClick(){
    navigate("/profile/" + (search.toLowerCase()).replace(/\s/g, ''));
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: '70%', borderColor: 'black', margin: 'auto'}}
      variant="outlined"
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Username"
        value={search}
        onChange={(e) => changeSearch(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} onClick={handleClick} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}