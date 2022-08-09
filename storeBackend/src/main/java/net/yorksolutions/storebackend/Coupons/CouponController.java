package net.yorksolutions.storebackend.Coupons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/coupons")
public class CouponController {

    CouponService service;
    @Autowired
    public CouponController(CouponService couponService){
        this.service = couponService;
    }
    @GetMapping
    public Iterable<Coupon> getCoupons(){
        return this.service.GET_COUPONS();
    }
    @GetMapping("/{id}")
    public Coupon getCoupon(@PathVariable Long id) {
        return this.service.GET_COUPON(id);
    }
    @PostMapping
    public void createCoupon(@RequestBody CouponRequest requestBody){
        this.service.CREATE_COUPON(requestBody);
    }
    @PutMapping
    public void editCoupon(@RequestBody CouponRequest requestBody){
        this.service.EDIT_COUPON(requestBody);
    }
    @DeleteMapping("/{id}")
    public void deleteCoupon(@PathVariable Long id){
        this.service.DELETE_COUPON(id);
    }
}
