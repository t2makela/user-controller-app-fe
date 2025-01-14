import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import { UserInfo } from "../types/userInfo";
import DeleteIcon from "@mui/icons-material/Delete";

function UserTable({
  tableData,
  deleteUser,
}: {
  tableData: Array<UserInfo>;
  deleteUser: (id: number) => void;
}) {
  function createTableHeaders(data: Array<UserInfo>): string[] {
    if (data && data.length) {
      const headers = Object.keys(data[0]);
      headers.push("actions");
      return headers.filter(
        (header) =>
          header !== "id" && header !== "address" && header !== "company"
      );
    }
    return [];
  }

  function handleDelete(id: number) {
    deleteUser(id);
  }
  const tableHeaders = createTableHeaders(tableData);
  return (
    <>
      {tableData.length === 0 && "No users to show"}
      {tableData.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders?.map((header) => (
                  <TableCell key={header}>
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.phone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.website}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default UserTable;
