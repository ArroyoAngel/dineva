import React, { Component, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
 
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";


// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import MUIDataTable from "mui-datatables";

import cloudIcon from "../../assets/tables/cloudIcon.svg";
import funnelIcon from "../../assets/tables/funnelIcon.svg";
import optionsIcon from "../../assets/tables/optionsIcon.svg";
import printerIcon from "../../assets/tables/printerIcon.svg";
import searchIcon from "../../assets/tables/searchIcon.svg";

import s from "./Tables.module.scss";

// -- Redux
import { connect } from "react-redux";

import {getWorkflow} from "../../redux/workflow/actions"
class Tables extends Component {
  pageSize = 4;

  constructor(props){
    super(props)
    this.state = {
      currentPage: 0,
      data: [],
      pageCount: 0,
    }

    this.setFirstTablePag = this.setFirstTablePag.bind(this)
  }

  componentDidMount(){
    this.props.getWorkflow();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.workflow!==this.props.workflow){
      //if(this.props.workflow.length>0)console.log("EXISTEN DATOS", this.props.workflow)
      this.setState({
        data: this.props.workflow,
        pageCount: Math.ceil(this.props.workflow.length / this.pageSize),
      })
    }
  }

 
  setFirstTablePag(e, index){
    e.preventDefault();
    this.setState({
      currentPage: index
    })
  }

  render(){
    console.log("ESTO ES DATA", this.state.data)
    //if(this.state.data.length>0)debugger
    return (
      <div>
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>
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
                            <label for="checkbox100"/>
                          </div>
                        </th>
                        <th className="w-25">RESPONSABLE</th>
                        <th className="w-25">ACCIÓN</th>
                        <th className="w-25">GRUPO</th>
                        <th className="w-25">DOCUMENTO</th>
                        <th className="w-25">FECHA</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.state.data
                        .slice(
                          this.state.currentPage * this.pageSize,
                          (this.state.currentPage + 1) * this.pageSize
                        )
                        .map(values => (
                          <tr key={uuidv4()}>
                            <td>
                              #
                            </td>
                            <td>{values.actor}</td>
                            <td>{values.action}</td>
                            <td>{values.collection}</td>
                            <td>{values.backup}</td>
                            <td>{values.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination className="pagination-borderless" aria-label="Page navigation example">
                      <PaginationItem disabled={this.state.currentPage <= 0}>
                        <PaginationLink
                          onClick={e => this.setFirstTablePag(e, this.state.currentPage - 1)}
                          previous
                          href="#top"
                        />
                      </PaginationItem>
                      {[...Array(this.state.pageCount)].map((page, i) =>
                        <PaginationItem active={i === this.state.currentPage} key={i}>
                          <PaginationLink onClick={e => this.setFirstTablePag(e, i)} href="#top">
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      <PaginationItem disabled={this.state.currentPage >= this.state.pageCount - 1}>
                        <PaginationLink
                          onClick={e => this.setFirstTablePag(e, this.state.currentPage + 1)}
                          next
                          href="#top"
                        />
                      </PaginationItem>
                    </Pagination>
                  </div>
                </Widget>
              </Col>
            </Row>
            
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 
  
  return { ...state };
};
const mapDispatchToProps =(dispatch)=> {
  return {
    getWorkflow: () => dispatch(getWorkflow()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables);