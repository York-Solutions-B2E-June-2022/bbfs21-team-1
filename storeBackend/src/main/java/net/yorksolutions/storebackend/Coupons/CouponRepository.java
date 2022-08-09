package net.yorksolutions.storebackend.Coupons;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends CrudRepository<Coupon, Long> {
}
