package com.hexaware.cozyhavenstay.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {


	private JWTTokenProvider jwtTokenProvider;

	private UserDetailsService customUserDetails;

	// initiating the current user string
	public static String CURRENT_USER = "";

	@Autowired
	public JWTAuthenticationFilter(JWTTokenProvider jwtTokenProvider, UserDetailsService customUserDetails) {
		super();
		this.jwtTokenProvider = jwtTokenProvider;
		this.customUserDetails = customUserDetails;
	}


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String token = getTokenFromRequest(request);

		// validate token
		if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
			String userName = jwtTokenProvider.getUsername(token);
			CURRENT_USER = userName;

			// load user name from db
			UserDetails userDetails = customUserDetails.loadUserByUsername(userName);
			// create an authentication object - (authenticated user)
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					userDetails, null, userDetails.getAuthorities());
			// add web related details
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			// Registers the security content - allow @PreAuthorize to work
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		}
		filterChain.doFilter(request, response); // to carry the next filter

	}

	// to get the token from the request
	private String getTokenFromRequest(HttpServletRequest request) {
		// to get the header name
		String bearerToken = request.getHeader("Authorization");

		// has contains text and starts with bearer
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}

		return null;
	}

}
