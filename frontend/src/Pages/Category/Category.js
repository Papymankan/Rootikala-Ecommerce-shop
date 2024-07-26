import React, { useEffect, useState } from "react";
import './Category.css'
import NavBar from "../../Components/NavBar/NavBar";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Box,Drawer, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { BsSortUpAlt } from "react-icons/bs";
import FilterAltIcon from '@mui/icons-material/FilterAltRounded';
import AllProductsCard from "../../Components/AllProductsCard/AllProductsCard";
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../../Components/Loader/Loader";


export default function Category() {

  const { id } = useParams()

  const [categoryDetails, setCategoryDetails] = useState({})

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9000/store/product-categories/${id}`, {
      }).then(res => res.json()).then(data => setCategoryDetails(data.product_category))

      fetch(`http://localhost:9000/store/products?category_id[]=${id}`, {
      }).then(res => {
        return res.json()
      }).then(data => {
        setAllProducts(data.products)
        setFetchComplete(true)
      })

    }
  }, [id])

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

  const [justAvailable, setjustAvailable] = useState(false);
  const [justSale, setJustSale] = useState(false);
  const [value, setValue] = useState([0, 100]);
  const [sortFilter, setSortFilter] = useState('new')
  const [allProducts, setAllProducts] = useState([])
  const [showProducts, setShowProducts] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [fetchComplete, setFetchComplete] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    console.log('clicked');
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open)
  };

  const DrawerFilter = () => {
    return (
      <div className="Container">
        <button onClick={toggleDrawer(false)} id='filterDrawer_Close'>
          <CloseIcon />
        </button>
        <div className="DrawerFilters">
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
              sx={{ color: '#10B981' }}
            />
            <div className="priceRange_prices">
              <span>{(value[1] / 100 * 50000000).toLocaleString()}<sub>تومان</sub> </span>
              <span>{(value[0] / 100 * 50000000).toLocaleString()}<sub>تومان</sub> </span>
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
      </div>
    )
  }

  const SortInHighPrice = (products) => {
    let arr = [products[0]]
    products.map((product, index) => {
      if (index == 0) {
        return
      }
      // variants[0].prices[0].amount
      var didPlaced = arr.some((arrProducts, index) => {
        if (arrProducts.variants[0].prices[0].amount <= product.variants[0].prices[0].amount) {
          console.log(product, arrProducts);
          arr.splice(index, 0, product)
          return true
        } else {
          return false
        }
      })
      if (!didPlaced) {
        arr.push(product)
      }
    })
    return arr
  }
  const SortProducts = (products) => {
    switch (sortFilter) {
      case 'new': {
        setShowProducts([...products])
        break
      }
      case 'old': {
        setShowProducts([...products].reverse())
        break
      }
      case 'h_price': {
        setShowProducts(SortInHighPrice(products))
        break
      }
      case 'l_price': {
        setShowProducts(SortInHighPrice(products).reverse())
        break
      }
    }
  }

  useEffect(() => {
    setShowProducts(allProducts)
  }, [allProducts])

  useEffect(() => {
    var arr = [...allProducts]
    if (justAvailable) {
      arr = arr.filter(product => {
        let res = product.variants.some(variant => variant.inventory_quantity > 0)
        return res
      })
    }
    if (justSale) {
      arr = arr.filter(product => product.collection != null)
    }

    arr = arr.filter(product => (product.variants[0].prices[0].amount >= (value[0] / 100 * 50_000_000) && product.variants[0].prices[0].amount <= (value[1] / 100 * 50_000_000)))

    SortProducts(arr)

  }, [justAvailable, justSale, value, sortFilter])

  return (
    <>
      <NavBar />

      <div className="BreadCrumbArea">
        <div className="Container">
          <BreadCrumb categoryDetails={categoryDetails} />

          <div className="HeaderFliters">
            <React.Fragment>
              <button onClick={toggleDrawer(true)}> <FilterAltIcon /> {'فیلتر ها'}  </button>
              <Drawer
                anchor={'bottom'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {DrawerFilter()}
              </Drawer>
            </React.Fragment>

            <Box sx={{ minWidth: 120, marginLeft: '10px' }} id='SortingHeader'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">مرتب سازی</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortFilter}
                  // displayEmpty
                  label="مرتب سازی"
                  onChange={(event) => {
                    setSortFilter(event.target.value)
                  }}
                >
                  <MenuItem value="new">جدیدترین</MenuItem>
                  <MenuItem value="old">قدیمی ترین</MenuItem>
                  <MenuItem value="h_price">گران ترین</MenuItem>
                  <MenuItem value="l_price">ارزان ترین</MenuItem>
                </Select>
              </FormControl>
            </Box>

          </div>
        </div>
      </div>

      <div className="Container" id="Category_container">
        <div className="Filters">
          <div>
            <h2>فیلتر ها</h2>
            <a onClick={() => {
              setjustAvailable(false)
              setJustSale(false)
              setValue([0, 100])
            }}>حذف همه</a>
          </div>
          <div className="priceRange">
            <div>محدوده قیمت</div>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              disableSwap
              sx={{ color: '#10B981' }}
            />
            <div className="priceRange_prices">
              <span>{(value[1] / 100 * 50000000).toLocaleString().EntoFa()} <sub>تومان</sub> </span>
              <span>{(value[0] / 100 * 50000000).toLocaleString().EntoFa()} <sub>تومان</sub> </span>
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
          <div className="SortFilters">
            <div><BsSortUpAlt /> مرتب سازی بر اساس</div>
            <div className={sortFilter == 'new' && `sortFilter_active`} onClick={() => setSortFilter('new')}>جدیدترین</div>
            <div className={sortFilter == 'old' && `sortFilter_active`} onClick={() => setSortFilter('old')}>قدیمی ترین</div>
            <div className={sortFilter == 'h_price' && `sortFilter_active`} onClick={() => setSortFilter('h_price')}>گران ترین</div>
            <div className={sortFilter == 'l_price' && `sortFilter_active`} onClick={() => setSortFilter('l_price')}>ارزان ترین</div>
          </div>
          <div className="Products">
            {
              fetchComplete ? (showProducts.length >= 1 ? showProducts.map(product => (<AllProductsCard {...product} />)) : (
                <div className="NoProductFound">
                  <img src="/Images/2791942_prev_ui.png" />
                  <span>عجیبه! محصولی یافت نشد</span>
                  {/* frontend\public\Images\2791942_prev_ui.png */}
                </div>
              )) : <Loader />
            }

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
