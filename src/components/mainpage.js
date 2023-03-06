import axios from "axios";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import TablePagination from "@mui/material/TablePagination";

import Paper from "@mui/material/Paper";

function Mainpage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const [pg, setpg] = useState(0);

  const [rpg, setrpg] = useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));

    setpg(0);
  }

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://openlibrary.org/subjects/love.json"
      );
      setPosts(response.data.works);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return <div className="container mw-20  ">
    <div className="row col-3 mx-ms-6"> 
    <input
          className="form-control input-sm mx-sm-5"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        </div><div className="border mt-5"></div>
        <Paper className="mt-2 col-11 mx-sm-3 ">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>

                

                <TableCell align="right">Author</TableCell>

                <TableCell align="right">Cover ID</TableCell>

                <TableCell align="right">First Publish Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody> 
          
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
            
          })

          .slice(pg * rpg, pg * rpg + rpg)
          .map((item) => (
             
                <TableRow
                  key={item.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0,
                    marginleft:'auto',marginRight:'auto' } }}
                >
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>

                  <TableCell align="right">{item.authors.map((getname,index)=>(
                     getname.name
                  ))}</TableCell>

                  <TableCell align="right">{item.cover_id}</TableCell>

                  <TableCell align="right">{item.first_publish_year}</TableCell>

                  
                </TableRow>
          ))
          )}
          </TableBody> 
          </Table>
        </TableContainer>
      <TablePagination
                rowsPerPageOptions={[5,10, 25]}
                component="div"
                count={posts.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>
  </div>;
}
export default Mainpage;
