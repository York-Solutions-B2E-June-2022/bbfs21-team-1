package net.yorksolutions.storebackend.Coupons;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CouponRequest {
    public Long id;
    public String label;
    public  String couponCode;
    public Float discount;
    public int useLimit;
    public LocalDate goodUntil;
}
