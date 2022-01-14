import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ marginRight: '10px 0px' })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2]
  const [filter, setFilters] = useState({})

  const handleFilters =  (e) => {
    const value = e.target.value;
    setFilters({
      ...filter,
      [e.target.name] : value,
    });
  };

  console.log(filter); // {} 로나오는데 , 여기서 filter Product, 색상 black선택하면 {color: 'Black'} 이라고 나온다.


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dressess</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products : </FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size"onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products: </FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Newsletter />
    </Container>
  );
};

export default ProductList;
