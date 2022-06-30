import { Component } from "react";
import Widget from "../Widget/Widget";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  ButtonDropdown,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Label,
  Badge,
  Modal,
  ModalBody
} from "reactstrap";
import cloudIcon from "../../assets/tables/cloudIcon.svg";
import funnelIcon from "../../assets/tables/funnelIcon.svg";
import optionsIcon from "../../assets/tables/optionsIcon.svg";
import printerIcon from "../../assets/tables/printerIcon.svg";
import searchIcon from "../../assets/tables/searchIcon.svg";
import moreIcon from "../../assets/tables/moreIcon.svg";
import { v4 as uuidv4 } from "uuid";

import s from "./styles.scss";
import mock from "./mock.js";

class TableComponent extends Component {
    constructor ( props ) {
        super(props)
        this.state = {
          data: [],
          currentPage: 0,
          pageSize: 5,
          pageCount: Math.ceil(0 / 2),

          isOpen: false,
          showImage: '',
        }
    }
    componentDidMount(){
      const { data, count } = this.props
      this.setState({
        data,
        pageCount: Math.ceil(data.length / count),
        currentPage: 0,
      })
    }
    componentDidUpdate(prevProps){
      const { data, count } = this.props
      if(prevProps.data !== this.props.data){
        this.setState({
          data,
          pageCount: Math.ceil(data.length / count),
          currentPage: 0,
        })
      }
    }
    setFirstTablePage(e, index){
      e.preventDefault();
      this.setState({
        currentPage: index
      })
    }
    render(){
        return (
            <Widget>
              <div className={s.tableTitle}>
                <div className="headline-2">States Colors</div>
                <div className="d-flex">
                  <a href="/#"><img src={searchIcon} alt="Search"/></a>
                  <a href="/#"><img className="d-none d-sm-block" src={cloudIcon} alt="Cloud" /></a>
                  <a href="/#"><img src={printerIcon} alt="Printer" /></a>
                  <a href="/#"><img className="d-none d-sm-block" src={optionsIcon} alt="Options" /></a>
                  <a href="/#"><img src={funnelIcon} alt="Funnel" /></a>
                </div>
              </div>
              <div className="widget-table-overflow">
                <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                  <thead>
                  <tr>
                    <th className={s.checkboxCol}>
                      <div className="checkbox checkbox-primary">
                        <input
                          className="styled"
                          id="checkbox100"
                          type="checkbox"
                        />
                        <label htmlFor="checkbox100"/>
                      </div>
                    </th>
                    {
                      this.props.cols.map((element, key)=>{
                        return <th key={key}>{element.header}</th>
                      })
                    }
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.data
                    .slice(
                      this.state.currentPage * this.state.pageSize,
                      (this.state.currentPage + 1) * this.state.pageSize
                    )
                    .map(item => (
                      <tr key={uuidv4()}>
                        <td>
                          <div className="checkbox checkbox-primary">
                            <input
                              id={item.id}
                              className="styled"
                              type="checkbox"
                            />
                            <Label htmlFor={item.id} />
                          </div>
                        </td>
                        {/*<td className="d-flex align-items-center"><img className={s.image} src={item.img} alt="User"/><span className="ml-3">{item.name}</span></td>*/}
                        {
                          this.props.cols.map((element, key)=>{
                            const result = eval(`item.${element.field}`)
                            if(!element.type || element.type==='text')return <td key={key}>{result}</td>
                            if(element.type==='image')return (
                              <td className="d-flex align-items-center" key={key}>
                                <div className="div-image" style={{ backgroundImage: `url(${result})`, width: '75px', height: '75px'}} onClick={()=>this.setState({ showImage: result, isOpen: true})}></div>
                                <span className="ml-3">{item.name}</span>
                              </td>
                            )
                          })
                        }
                        { item.edit && <td><button onClick={()=>item.edit(item.id?item.id:item)}>Editar</button></td> }
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="pagination-borderless" aria-label="Page navigation example">
                  <PaginationItem disabled={this.state.currentPage <= 0}>
                    <PaginationLink
                      onClick={e => this.setFirstTablePage(e, this.state.currentPage - 1)}
                      previous
                      href="#top"
                    />
                  </PaginationItem>
                  {[...Array(this.state.pageCount)].map((page, i) =>
                    <PaginationItem active={i === this.state.currentPage} key={i}>
                      <PaginationLink onClick={e => this.setFirstTablePage(e, i)} href="#top">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem disabled={this.state.currentPage >= this.state.pageCount - 1}>
                    <PaginationLink
                      onClick={e => this.setFirstTablePage(e, this.state.currentPage + 1)}
                      next
                      href="#top"
                    />
                  </PaginationItem>
                </Pagination>
              </div>
              <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({ isOpen: !this.state.isOpen })} >
                <ModalBody>
                  <img src={this.state.showImage} style={{ maxWidth: '100%'}}></img>
                </ModalBody>
              </Modal>
            </Widget>
        )
    }
}

export default TableComponent