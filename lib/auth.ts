import { supabase } from "./supabase";
import { User, AuthError } from "./types/auth";

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) {
      throw new Error("사용자 계정을 생성할 수 없습니다.");
    }

    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "회원가입 중 오류가 발생했습니다.",
      },
    };
  }
}

export async function verifyEmail(email: string, token: string) {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  return { error };
}

export async function resendVerificationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  return { error };
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "로그인 중 오류가 발생했습니다.",
      },
    };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // 세션 스토리지에서 모든 관련 정보 삭제
    if (typeof window !== "undefined") {
      localStorage.removeItem("forceLogin");
      localStorage.removeItem("loginTimestamp");
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error
            ? error.message
            : "로그아웃 중 오류가 발생했습니다.",
      },
    };
  }
}

export async function getCurrentUser() {
  try {
    // 세션이 없으면 조용히 null 반환
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // 세션이 없거나 오류가 있으면 null 반환
    if (error || !user) {
      return { user: null, error: null };
    }

    // 프로필 정보 조회
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // 프로필이 없으면 오류 반환
    if (profileError) {
      return {
        user: null,
        error: {
          message: "프로필 정보가 없습니다. 관리자에게 문의하세요.",
        },
      };
    }

    // 사용자 정보와 프로필 정보 합쳐서 반환
    return { user: { ...user, ...profile }, error: null };
  } catch (error) {
    // 오류 반환
    return {
      user: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "사용자 정보를 가져오는 중 오류가 발생했습니다.",
      },
    };
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<User>
) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return { profile: data, error: null };
  } catch (error) {
    return {
      profile: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "프로필 업데이트 중 오류가 발생했습니다.",
      },
    };
  }
}

export async function createUserProfile(userId: string, email: string) {
  try {
    // 이미 프로필이 있는지 확인
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    // 이미 프로필이 있으면 건너뜀
    if (existingProfile) {
      return { profile: existingProfile, error: null };
    }

    // 프로필 생성
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return { profile: data, error: null };
  } catch (error) {
    return {
      profile: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "프로필 생성 중 오류가 발생했습니다.",
      },
    };
  }
}
