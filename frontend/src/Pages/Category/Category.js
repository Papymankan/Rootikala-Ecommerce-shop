import React, { useEffect, useState } from "react";
import './Category.css'
import NavBar from "../../Components/NavBar/NavBar";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";

export default function Category() {

  const { id } = useParams()

  const [categoryDetails, setCategoryDetails] = useState({})

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9000/store/product-categories/${id}`, {
      }).then(res => res.json()).then(data => setCategoryDetails(data.product_category))
    }
  }, [id])

  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#10B981',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#10B981',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const [justAvailable, setjustAvailable] = React.useState(false);
  const [justSale, setJustSale] = React.useState(false);

  const [value, setValue] = React.useState([0, 50000000]);

  const minDistance = 1000000;

  const handleChange = (event, newValue , activeThumb) => {
    setValue(newValue);
    // if (!Array.isArray(newValue)) {
    //   return;
    // }
    // console.log(newValue);
    // console.log(activeThumb);

    // if (activeThumb === 0) {
    //   setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    // } else {
    //   setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    // }
  };

  return (
    <>
      <NavBar />
      <BreadCrumb categoryDetails={categoryDetails} />
      <div className="Container" id="Category_container">
        <div className="Filters">
          <div>
            <h2>فیلتر ها</h2>
            <a>حذف همه</a>
          </div>
          <div className="priceRange">
            <div>محدوده قیمت</div>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              disableSwap
              sx={{ color: '#10B981'}}
            />
            <div className="priceRange_prices">
              <span>{(10000000).toLocaleString()}<sub>تومان</sub> </span>
              <span>{(10000000).toLocaleString()}<sub>تومان</sub> </span>
            </div>
          </div>
          <div className="FilterToggles">
            <span>فقط کالا های موجود</span>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked onChange={(event) => { setjustAvailable(event.target.checked); }} checked={justAvailable} />}
            />
          </div>
          <div className="FilterToggles">
            <span>فقط کالا های دارای تخفیف</span>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked onChange={(event) => { setJustSale(event.target.checked); }} checked={justSale} />}
            />
          </div>
        </div>
        <div className="Products_container">

        </div>
      </div>
      <Footer />
    </>
  );
}
