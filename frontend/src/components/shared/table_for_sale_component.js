import { useState, useEffect, Fragment, useContext } from "react";
import {
  Table,
  Popover,
  Whisper,
  Checkbox,
  Dropdown,
  IconButton,
  Tooltip,
  Loader,
  Pagination,
  CustomProvider,
} from "rsuite";
import MoreIcon from "@rsuite/icons/legacy/More";
import { AppContext } from "../Context/AppContext";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const SalesTable = (props) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const {
    defaultData,
    headers,
    checkedItems,
    columnWidth,
    tableHeight,
    inputRef,
    tableRef,
  } = props;
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [rows, setRows] = useState();

  const { theme } = useContext(AppContext);
  if (theme === "dark") {
    var tableColor = "dark";
    var columnText = "text-light";
  } else if (theme === "light") {
    tableColor = "light";
    columnText = "text-dark";
  }

  // const CreateTablePages = (data) => {
  //   setRows(data.length);
  //   data = data.filter((v, i) => {
  //     const start = limit * (page - 1);
  //     const end = start + limit;
  //     return i >= start && i < end;
  //   });
  //   return data;
  // };
  useEffect(() => {
    // const data = CreateTablePages(defaultData);
    setData(defaultData);
  }, [defaultData, page, limit]);

  // const handleChangeLimit = (dataKey) => {
  //   setPage(1);
  //   setLimit(dataKey);
  // };

  const NameCell = ({ rowData, headers, dataKey, ...props }) => {
    const speaker = (
      <Popover title="Description">
        {headers.map((item) => (
          <p>
            <b>{item["text"]}: </b> {rowData[item["dataKey"]]}
          </p>
        ))}
      </Popover>
    );
    return (
      <Cell {...props}>
        <Whisper placement="top" speaker={speaker}>
          <a>{rowData[dataKey]}</a>
        </Whisper>
      </Cell>
    );
  };
  const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div
        style={{
          width: 40,
          height: 40,
          background: "#f5f5f5",
          borderRadius: 6,
          marginTop: 2,
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <img src={rowData.image} width="40" alt="" />
      </div>
    </Cell>
  );

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = (eventKey) => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1}>Remove</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Edit</Dropdown.Item>
          <Dropdown.Item eventKey={4}>View</Dropdown.Item>
          <Dropdown.Item eventKey={5}>Block/unlist</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const ActionCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props} className="link-group">
        <Whisper
          placement="autoVerticalStart"
          trigger="click"
          speaker={renderMenu}
        >
          <IconButton appearance="subtle" icon={<MoreIcon />} />
        </Whisper>
      </Cell>
    );
  };

  useEffect(() => {
    checkedItems(checkedKeys);
  }, [checkedKeys]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item._id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const SearchData = (event) => {
    let search_key = event.target.value;

    if (search_key == "") {
      // const data = CreateTablePages(defaultData);
      // setData(data);
      setData(defaultData);
      return;
    }
    const keys = headers
      .filter((value) => {
        return value["search"];
      })
      .map((value) => {
        return value["dataKey"];
      });
    let filter_data = defaultData.filter((value) => {
      let found = [];
      if (search_key != "") {
        for (let i of keys) {
          if (value[i] != null) {
            found.push(
              value[i].toString().includes(search_key) === true ? 1 : 0
            );
          }
        }
        const sum = found.reduce((prevValue, curValue) => {
          return prevValue + curValue;
        }, 0);
        return sum > 0;
      }
    });
    // filter_data = CreateTablePages(filter_data);
    setData(filter_data);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    if (sortColumn && sortType) {
      data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
      setData(data);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (
    <CustomProvider theme={tableColor}>
      <div className="container-fluid">
        <div style={{ height: "auto", width: "auto" }}>
          <div className="row">
            <div className="col-12 p-1">
              <Whisper
                placement="top"
                speaker={<Tooltip>Press "Ctrl + s" to Search</Tooltip>}
              >
                <div className="form-group">
                  <input
                    ref={inputRef}
                    onKeyUp={SearchData}
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </Whisper>
            </div>
            {/* <div className="col-1 p-1">
            <button
              disabled={checkedKeys.length === 0}
              className="w-100 btn btn-danger"
            >
              Delete
            </button>
          </div> */}
          </div>
          <Table
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            //   autoHeight={true}
            loading={data !== undefined && data.length === 0 && loading}
            className="container-fluid"
            data={data}
            height={tableHeight}
            id="table"
          >
            {/* <Table className="container-fluid" height={450} data={data} id="table"> */}
            <Column width={150} flexGrow={"1"} align="center">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: "40px" }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>
              <CheckCell
                dataKey="_id"
                checkedKeys={checkedKeys}
                onChange={handleCheck}
              />
            </Column>

            {headers.map((obj, index) => (
              <Column
                width={columnWidth}
                align="center"
                sortable
                className={columnText}
              >
                <HeaderCell>{obj.text}</HeaderCell>
                {obj.type !== "text" ? (
                  <ImageCell dataKey={obj.dataKey} />
                ) : (
                  <NameCell headers={headers} dataKey={obj.dataKey} />
                )}
              </Column>
            ))}

            {/* <Column>
            <HeaderCell>Actions</HeaderCell>
            <ActionCell />
          </Column> */}
          </Table>
          {/* <div style={{ padding: 0 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={rows}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div> */}
        </div>
      </div>
    </CustomProvider>
  );
};

export default SalesTable;
