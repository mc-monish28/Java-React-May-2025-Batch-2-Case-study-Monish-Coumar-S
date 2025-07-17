package com.hexaware.cozyhavenstay;

import com.hexaware.cozyhavenstay.entity.*;
import com.hexaware.cozyhavenstay.enums.UserRole;
import com.hexaware.cozyhavenstay.repository.*;
import com.hexaware.cozyhavenstay.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.*;
import java.lang.reflect.Field;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class CozyhavenstayApplicationTests {

    @Mock
    private BookingRepository bookingRepository;
    @Mock
    private RoomRepository roomRepository;
    @Mock
    private HotelService hotelService;
    @Mock
    private ReservationRepository reservationRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private HotelRepository hotelRepository;

    @InjectMocks
    private BookingService bookingService;
    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        bookingService = new BookingService();
        userService = new UserService();
        // Use reflection to set private fields
        setField(bookingService, "bookingRepository", bookingRepository);
        setField(bookingService, "roomRepository", roomRepository);
        setField(bookingService, "hotelService", hotelService);
        setField(userService, "userRepository", userRepository);
        setField(userService, "hotelRepository", hotelRepository);
        setField(userService, "roomRepository", roomRepository);
        setField(userService, "reservationRepository", reservationRepository);
        setField(userService, "bookingRepository", bookingRepository);
    }

    private void setField(Object target, String fieldName, Object value) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    @Test
    void testGetBookingsByHotel() {
        Hotel hotel = new Hotel();
        hotel.setHotelId(1L);
        User owner = new User();
        owner.setUserId(2L);
        owner.setRole(UserRole.HOTEL_OWNER);
        hotel.setOwner(owner);
        Room room = new Room();
        room.setRoomId(3L);
        room.setHotel(hotel);
        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setUser(owner);
        booking.setCheckIn(LocalDate.now());
        booking.setCheckOut(LocalDate.now().plusDays(1));
        hotel.setRooms(Collections.singletonList(room));
        when(hotelService.getHotelById(1L)).thenReturn(hotel);
        when(bookingRepository.findByRoom(room)).thenReturn(Collections.singletonList(booking));
        List<Booking> bookings = bookingService.getBookingsByHotel(1L, owner);
        assertThat(bookings).hasSize(1);
        assertThat(bookings.get(0).getRoom().getRoomId()).isEqualTo(3L);
    }

    @Test
    void testProcessPaymentCreatesBooking() {
        User user = new User();
        user.setUserId(1L);
        Room room = new Room();
        room.setRoomId(2L);
        Reservation reservation = new Reservation();
        reservation.setReservationId(10L);
        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setCheckInDate(LocalDate.now());
        reservation.setCheckOutDate(LocalDate.now().plusDays(1));
        reservation.setTotalPrice(100.0);
        reservation.setPaymentStatus("PENDING");
        when(reservationRepository.findById(10L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(bookingRepository.findByRoom(room)).thenReturn(Collections.emptyList());
        // Mock SecurityContext and userRepository for getCurrentUser
        org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(
            new org.springframework.security.authentication.UsernamePasswordAuthenticationToken("test@email.com", "N/A", new ArrayList<>())
        );
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        Reservation result = userService.processPayment(10L);
        assertThat(result.getPaymentStatus()).isEqualTo("PAID");
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    void testMakeReservationCreatesReservation() {
        User user = new User();
        user.setUserId(1L);
        Room room = new Room();
        room.setRoomId(2L);
        when(roomRepository.findById(2L)).thenReturn(Optional.of(room));
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        // Mock SecurityContext
        org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken("test@email.com", "N/A", new ArrayList<>())
        );
        Reservation reservation = userService.makeReservation(2L, LocalDate.now().plusDays(1), LocalDate.now().plusDays(2));
        assertThat(reservation.getRoom().getRoomId()).isEqualTo(2L);
        assertThat(reservation.getStatus()).isEqualTo("CONFIRMED");
        assertThat(reservation.getPaymentStatus()).isEqualTo("PENDING");
    }
}
