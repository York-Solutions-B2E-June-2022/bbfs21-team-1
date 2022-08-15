package net.yorksolutions.storebackend.Coupons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import static net.yorksolutions.storebackend.Helpers.*;

@Service
public class CouponService {
    CouponRepository repository;
    @Autowired
    public CouponService(CouponRepository couponRepository){
        this.repository = couponRepository;
    }
    public Iterable<Coupon> GET_COUPONS(){
        return this.repository.findAll();
    }
    public Coupon GET_COUPON(Long id){
        return emptyCheck(this.repository.findById(id));
    }
    public void CREATE_COUPON(CouponRequest requestBody){
        Coupon newCoupon = new Coupon(
                nullCheck(requestBody.label),
                nullCheck(requestBody.couponCode),
                nullCheck(requestBody.discount),
                requestBody.useLimit,
                nullCheck(requestBody.goodUntil)
        );
        this.repository.save(newCoupon);
    }
    public void EDIT_COUPON(CouponRequest requestBody){
        Coupon coupon = emptyCheck(this.repository.findById(requestBody.id));
        coupon.label = requestBody.label;
        coupon.couponCode = requestBody.couponCode;
        coupon.discount = requestBody.discount;
        coupon.useLimit = requestBody.useLimit;
        coupon.goodUntil = requestBody.goodUntil;
        this.repository.save(coupon);
    }
    public void DELETE_COUPON(Long id){
        this.repository.deleteById(id);
    }
}
