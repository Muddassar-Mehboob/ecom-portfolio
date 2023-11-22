import React, {useEffect} from 'react';
import "./Sidebar.scss";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';

const Sidebar = () => {

  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories())
  }, [dispatch])

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
        <>
                <li className='nav-item no-wrap'>
                  <Link to="/" className='nav-link text-capitalize'>Home</Link>
                </li>
                <li className='nav-item no-wrap'>
                  <Link to='./src/pages/Products/Products' className='nav-link text-capitalize'>Products</Link>
                </li>
                <li className='nav-item no-wrap'>
                  <Link to="./src/pages/NewArrival/NewArrival" className='nav-link text-capitalize'>NewArrival</Link>
                </li>
                <li className='nav-item no-wrap'>
                  <Link to="./src/pages/About/about" className='nav-link text-capitalize'>About</Link>
                </li>
                </>
          {
            categories.map((category, idx) => {
              return (
                <li key = {idx} onClick = {() => dispatch(setSidebarOff())}>
                  <Link to = {`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar