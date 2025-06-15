package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.StudentManagementModule;

import java.util.List;
import java.util.Optional;

public interface StudentManagementModuleRepository extends 
    JpaRepository<StudentManagementModule, Long> {
    
    // Find by email using derived query method
    Optional<StudentManagementModule> findByEmail(String email);
    
    // Find all active students
    List<StudentManagementModule> findByIsActiveTrue();
    
    // Find by first name containing (case-insensitive)
    List<StudentManagementModule> findByFirstNameContainingIgnoreCase(String namePart);
    
    // Find by enrollment year using JPQL
    @Query("SELECT s FROM StudentManagementModule s WHERE YEAR(s.enrollmentDate) = :year")
    List<StudentManagementModule> findByEnrollmentYear(@Param("year") int year);
    
    // Find by department with native query
    @Query(value = "SELECT * FROM students WHERE department = :dept", nativeQuery = true)
    List<StudentManagementModule> findByDepartmentNative(@Param("dept") String department);
    
    // Find students with GPA greater than
    List<StudentManagementModule> findByGpaGreaterThanEqual(Double gpa);
    
    // Find by multiple criteria
    @Query("SELECT s FROM StudentManagementModule s WHERE " +
           "(:firstName IS NULL OR s.firstName LIKE %:firstName%) AND " +
           "(:lastName IS NULL OR s.lastName LIKE %:lastName%) AND " +
           "(:minGpa IS NULL OR s.gpa >= :minGpa)")
    List<StudentManagementModule> searchStudents(
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("minGpa") Double minGpa);
    
    // Projection query for student names only
    @Query("SELECT s.firstName, s.lastName FROM StudentManagementModule s")
    List<Object[]> findAllStudentNames();
    
    // Update status by ID
    @Modifying
    @Query("UPDATE StudentManagementModule s SET s.isActive = :status WHERE s.id = :id")
    void updateStudentStatus(@Param("id") Long id, @Param("status") boolean status);
    
    // Count students by department
    long countByDepartment(String department);
    
    // Check if email exists
    boolean existsByEmail(String email);
}