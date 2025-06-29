package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.BillingModule;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BillingModuleRepository extends JpaRepository<BillingModule, Long> {

    // Find by invoice number using derived query
    Optional<BillingModule> findByInvoiceNumber(String invoiceNumber);

    // Find all bills for a specific customer
    List<BillingModule> findByCustomerId(Long customerId);

    // Find bills within a date range
    List<BillingModule> findByBillingDateBetween(LocalDate startDate, LocalDate endDate);

    // Find paid/unpaid bills
    List<BillingModule> findByPaid(boolean isPaid);

    // Find bills with amount greater than specified value
    List<BillingModule> findByAmountGreaterThan(Double amount);

    // Find bills by status using JPQL
    @Query("SELECT b FROM BillingModule b WHERE b.status = :status")
    List<BillingModule> findByStatus(@Param("status") String status);

    // Find bills with amount between two values
    @Query("SELECT b FROM BillingModule b WHERE b.amount BETWEEN :minAmount AND :maxAmount")
    List<BillingModule> findBillsInAmountRange(@Param("minAmount") Double minAmount, 
                                              @Param("maxAmount") Double maxAmount);

    // Find top 5 highest bills
    @Query("SELECT b FROM BillingModule b ORDER BY b.amount DESC LIMIT 5")
    List<BillingModule> findTop5HighestBills();

    // Count unpaid bills for a customer
    @Query("SELECT COUNT(b) FROM BillingModule b WHERE b.customerId = :customerId AND b.paid = false")
    Long countUnpaidBillsByCustomer(@Param("customerId") Long customerId);

    // Find bills with specific payment method using native query
    @Query(value = "SELECT * FROM billing_module WHERE payment_method = :method", nativeQuery = true)
    List<BillingModule> findByPaymentMethodNative(@Param("method") String paymentMethod);

    // Projection query to get only invoice number and amount
    @Query("SELECT b.invoiceNumber as invoiceNumber, b.amount as amount FROM BillingModule b WHERE b.customerId = :customerId")
    List<BillingSummary> findBillingSummariesByCustomer(@Param("customerId") Long customerId);

    // Update payment status by invoice number
    @Modifying
    @Query("UPDATE BillingModule b SET b.paid = :paid WHERE b.invoiceNumber = :invoiceNumber")
    int updatePaymentStatus(@Param("invoiceNumber") String invoiceNumber, @Param("paid") boolean paid);

    // Interface for projection
    interface BillingSummary {
        String getInvoiceNumber();
        Double getAmount();
    }
}