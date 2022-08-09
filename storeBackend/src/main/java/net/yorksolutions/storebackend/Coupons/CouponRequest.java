package net.yorksolutions.storebackend.Coupons;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class CouponRequest {
    public Long id;
    public String label;
    public  String code;
    public Float discount;
    public int limit;
    public LocalDateTime goodUntil;
}
